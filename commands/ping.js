const Discord = require('discord.js');

module.exports = async (client,msg) =>{
    const m = await msg.channel.send("Ping?");
    m.delete();
    if(m.createdTimestamp - msg.createdTimestamp < 1000){
        return msg.channel.send(
            new Discord.MessageEmbed()
              .setDescription(` :white_check_mark: Pong! A Latência é ${m.createdTimestamp - msg.createdTimestamp}ms.`)
              .setColor('#011eff')
              .setFooter('Brabbot 2021', 'https://cdn.discordapp.com/attachments/719722218673799228/742718851610968155/download.png')
          )
    } else {
        return msg.channel.send(
            new Discord.MessageEmbed()
              .setDescription(` :x: Estou enfrentando problemas! Ping atual:${m.createdTimestamp - msg.createdTimestamp}ms`)
              .setColor('#011eff')
              .setFooter('Brabbot 2021', 'https://cdn.discordapp.com/attachments/719722218673799228/742718851610968155/download.png')
          )
    }
}