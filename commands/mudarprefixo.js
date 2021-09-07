const Discord = require('discord.js');
const low = require('lowdb');
const shortid = require('shortid');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('db.json');
const db = low(adapter);

module.exports = async (client,msg) => {
    const new_prefix = msg.content.split(' ').slice(1).join(' ')[0];
    if(!new_prefix || 0 === new_prefix.length || isNaN(new_prefix) === false){
        return msg.channel.send(
            new Discord.MessageEmbed()
                .setTitle(':x: Prefixo não informado!')
                .setColor('#011eff')
                .setFooter('Brabbot 2020', 'https://cdn.discordapp.com/avatars/823899858942951486/6b63aa8ed16856c2d74023323b4d0394.webp')
        )
    }
    if(!msg.member.hasPermission('MANAGE_GUILD')){
        return msg.channel.send(
            new Discord.MessageEmbed()
                .setTitle(':x: Você não tem permissão!')
                .setColor('#011eff')
                .setFooter('Brabbot 2020', 'https://cdn.discordapp.com/avatars/823899858942951486/6b63aa8ed16856c2d74023323b4d0394.webp')
        )
    }

    const havePrefix = await db.get('prefixes').find({guildId: msg.guild.id}).value();
    
    if(!havePrefix){
        await db
        .get('prefixes')
        .push({
            id: shortid.generate(),
            guildId: msg.guild.id,
            prefix: new_prefix
        })
        .write()
        .id
    } else {
       if(havePrefix.prefix === new_prefix){
        return msg.channel.send(
            new Discord.MessageEmbed()
                .setTitle(':x: Este é o prefixo atual!')
                .setColor('#011eff')
                .setFooter('Brabbot 2020', 'https://cdn.discordapp.com/avatars/823899858942951486/6b63aa8ed16856c2d74023323b4d0394.webp')
        )
       } else {
        await db.get('prefixes').find({guildId: msg.guild.id}).assign({prefix: `${new_prefix}`}).write();
       }
    }

    return msg.channel.send(
        new Discord.MessageEmbed()
            .setTitle(':white_check_mark: Prefixo Alterado!')
            .setDescription(`Prefixo alterado para ${new_prefix} com sucesso!`)
            .setColor('#011eff')
            .setFooter('Brabbot 2020', 'https://cdn.discordapp.com/avatars/823899858942951486/6b63aa8ed16856c2d74023323b4d0394.webp')
    )
}