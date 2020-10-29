const Discord = require('discord.js');

module.exports = (client,msg) =>{
    return msg.channel.send(
        new Discord.MessageEmbed()
          .setDescription(`Bora among agora! Entra na call! @everyone`)
          .setImage(' https://i0.wp.com/asapland.com/wp-content/uploads/2020/09/among-us-come-selezionare-cambiare-mappa-gioco-v5-469369.jpg?fit=1920%2C1072&ssl=1')
          .setColor('#011eff')
          .setFooter('Brabbot 2020', 'https://cdn.discordapp.com/attachments/719722218673799228/742718851610968155/download.png')
      )
}