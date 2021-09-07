const Discord = require('discord.js');

module.exports = async (client,msg) =>{
    const m = await msg.channel.send("Ping?");
    m.delete();
    if(m.createdTimestamp - msg.createdTimestamp < 1000){
        return msg.channel.send(
            new Discord.MessageEmbed()
              .setDescription(` :white_check_mark: Pong! A Latência é ${m.createdTimestamp - msg.createdTimestamp}ms.`)
              .setColor('#011eff')
              .setFooter('Brabbot 2021', 'https://cdn.discordapp.com/avatars/823899858942951486/6b63aa8ed16856c2d74023323b4d0394.webp')
          )
    } else {
        return msg.channel.send(
            new Discord.MessageEmbed()
              .setDescription(` :x: Estou enfrentando problemas! Ping atual:${m.createdTimestamp - msg.createdTimestamp}ms`)
              .setColor('#011eff')
              .setFooter('Brabbot 2021', 'https://cdn.discordapp.com/avatars/823899858942951486/6b63aa8ed16856c2d74023323b4d0394.webp')
          )
    }
}