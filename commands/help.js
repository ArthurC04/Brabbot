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

    const descriptions = {
        [`${prefix}ajuda`]: 'Lista dos comandos!',
        [`${prefix}among`]: 'Chame a galera pra jogar among us!',
        [`${prefix}clear`]: 'Limpar o chat!',
        [`${prefix}ping`]:  'Ver o ping do bot!',
        [`${prefix}calcularequação`]: 'Cacalcular equação do segundo grau!',
        [`${prefix}mudarprefixo`]: 'Mude o prefixo padrão do bot (@) para outro de sua preferência!',
    };

    const response = new Discord.MessageEmbed()
        .setTitle(':thinking: Ajuda!')
        .setDescription(`Quais são meus comando e o que eles fazem:`)
        .setColor('#011eff')
        .setFooter('Brabbot 2020', 'https://cdn.discordapp.com/attachments/719722218673799228/742718851610968155/download.png')
    
    const commands = commandsScript(prefix);
    Object.keys(commands).forEach(command => {
        response.addField(`\n ${command}:`, `${descriptions[command] ? descriptions[command] : 'Nenhuma descrição!'}`)
    });
    msg.channel.send(response);
};