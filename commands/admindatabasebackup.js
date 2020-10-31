const fs = require('fs');
const Discord = require('discord.js');

module.exports = async (client,msg) =>{
    fs.copyFile('./db.json', `./backups/${Date.now()}-db.json`, (err) => {
        if (err) {
            console.log(err);
            return msg.channel.send(
                new Discord.MessageEmbed()
                  .setDescription(`:x: Algo deu errado! Tente entrar em contato com o desenvolvedor.`)
                  .setFooter('Brabbot 2020', 'https://cdn.discordapp.com/attachments/719722218673799228/742718851610968155/download.png')
                  .setColor('#011eff')
              );
        } else {
            return msg.channel.send(
                new Discord.MessageEmbed()
                  .setTitle(':white_check_mark: Sucesso!')
                  .setColor('#011eff')
            );
        }
      });
}