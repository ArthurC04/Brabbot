const Discord = require('discord.js');
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

    var message = msg.content.split(" ");
    message = message[0];
    const embed = new Discord.MessageEmbed()
    .setTitle(':x: Erro')
    .setDescription(`Comando ${message} não existe\nDigite ${prefix}help para obter a lista de comandos`)
	.setFooter('Brabbot 2020', 'https://cdn.discordapp.com/avatars/823899858942951486/6b63aa8ed16856c2d74023323b4d0394.webp')
    .setColor('#011eff')
    msg.channel.send(embed);
}