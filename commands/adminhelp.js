const Discord = require('discord.js');
const commandsScript  = require('../scripts/commandsReader');

const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('db.json');
const db = low(adapter);

module.exports = async (client,msg) =>{
    
    const havePrefix = await db.get('prefixes').find({guildId: msg.guild.id}).value();
    var prefix;

    if(!havePrefix){
        prefix = '@';
    } else {
        prefix = havePrefix.prefix;
    }

    try {
        const isAdmin = await db.get('admins').find({discordUserId: msg.author.id}).value();
        const isAmongAdmin = await db.get('amongadmins').find({discordUserId: msg.author.id}).value();
        if(isAdmin || isAmongAdmin) {
            const descriptions = {
                [`${prefix}adminamongmute`]: 'Muta todos do seu canal de voz!',
                [`${prefix}adminamongunmute`]: 'Desmuta todos do seu canal de voz!',
                [`${prefix}admindatabase`]: 'Fazer dowload da database!',
                [`${prefix}admindatabasebackup`]: 'Criar backup da database!',
                [`${prefix}admingive`]: 'Dar item a um jogador',
                [`${prefix}adminhelp`]: 'Listar comandos de admin!',
                [`${prefix}adminadd`]: 'Adicionar novo admin',
                [`${prefix}adminremove`]: 'Remover admin',
            };
        
            const response = new Discord.MessageEmbed()
                .setTitle(':thinking: Ajuda!')
                .setDescription(`Quais são meus comandos de admin e o que eles fazem:`)
                .setColor('#011eff')
                .setFooter('Brabbot 2020', 'https://cdn.discordapp.com/avatars/823899858942951486/6b63aa8ed16856c2d74023323b4d0394.webp')
            
            const commands = commandsScript(prefix);
            Object.keys(commands).forEach(command => {
                if(isAdmin || isAmongAdmin) {
                    if(command.startsWith(`${prefix}admin`)) {
                        response.addField(`\n ${command}:`, `${descriptions[command] ? descriptions[command] : 'Nenhuma descrição!'}`)
                    }
                } else {
                    if(isAmongAdmin) {
                        if(command.startsWith(`${prefix}adminamong`)) {
                            response.addField(`\n ${command}:`, `${descriptions[command] ? descriptions[command] : 'Nenhuma descrição!'}`)
                        }
                    }
                }
            });
            msg.author.send(response);
            return msg.channel.send(
                new Discord.MessageEmbed()
                  .setDescription(`:white_check_mark:Os comandos foram enviados em seu privado!`)
                  .setFooter('Brabbot 2020', 'https://cdn.discordapp.com/avatars/823899858942951486/6b63aa8ed16856c2d74023323b4d0394.webp')
                  .setColor('#011eff')
              );
        } else {
            return msg.channel.send(
                new Discord.MessageEmbed()
                  .setDescription(`:x: Você não possui permissão!`)
                  .setFooter('Brabbot 2020', 'https://cdn.discordapp.com/avatars/823899858942951486/6b63aa8ed16856c2d74023323b4d0394.webp')
                  .setColor('#011eff')
              );
        }
     } catch (err) {
        console.log(err);
        return msg.channel.send(
            new Discord.MessageEmbed()
              .setDescription(`:x: Algo deu errado! Tente entrar em contato com o desenvolvedor.`)
              .setFooter('Brabbot 2020', 'https://cdn.discordapp.com/avatars/823899858942951486/6b63aa8ed16856c2d74023323b4d0394.webp')
              .setColor('#011eff')
          );
    }
};