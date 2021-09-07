const fs = require('fs');
const Discord = require('discord.js');

module.exports = async (client,msg) =>{
      try {
        const isAdmin = await db.get('admins').find({discordUserId: msg.author.id}).value();
        if(!isAdmin) {
            return msg.channel.send(
                new Discord.MessageEmbed()
                  .setDescription(`:x: Você não possui permissão!`)
                  .setFooter('Brabbot 2020', 'https://cdn.discordapp.com/avatars/823899858942951486/6b63aa8ed16856c2d74023323b4d0394.webp')
                  .setColor('#011eff')
              );
        } else {
            fs.copyFile('./db.json', `./backups/${Date.now()}-db.json`, (err) => {
                if (err) {
                    console.log(err);
                    return msg.channel.send(
                        new Discord.MessageEmbed()
                          .setDescription(`:x: Algo deu errado! Tente entrar em contato com o desenvolvedor.`)
                          .setFooter('Brabbot 2020', 'https://cdn.discordapp.com/avatars/823899858942951486/6b63aa8ed16856c2d74023323b4d0394.webp')
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
    } catch (err) {
        console.log(err);
        return msg.channel.send(
            new Discord.MessageEmbed()
              .setDescription(`:x: Algo deu errado! Tente entrar em contato com o desenvolvedor.`)
              .setFooter('Brabbot 2020', 'https://cdn.discordapp.com/avatars/823899858942951486/6b63aa8ed16856c2d74023323b4d0394.webp')
              .setColor('#011eff')
          );
    }
}