const Discord = require('discord.js');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('db.json');
const db = low(adapter);

module.exports = async (client,msg) =>{
   try {
    const isAdmin = await db.get('admins').find({discordUserId: msg.author.id}).value();
    if(!isAdmin) {
        return msg.channel.send(
            new Discord.MessageEmbed()
              .setDescription(`:x: Você não possui permissão!`)
              .setFooter('Brabbot 2020', 'https://cdn.discordapp.com/attachments/719722218673799228/742718851610968155/download.png')
              .setColor('#011eff')
          );
    }
    const args = msg.content.split(' ').slice(1); 
    const newAdminId = args[0];
    const adminType = args[1];
    if(adminType === 'admin') {
        await db
        .get('admins')
        .push({
        discordUserId: newAdminId,
        })
        .write()
        return msg.channel.send(
            new Discord.MessageEmbed()
              .setDescription(`:white_check_mark: Sucesso`)
              .setFooter('Brabbot 2020', 'https://cdn.discordapp.com/attachments/719722218673799228/742718851610968155/download.png')
              .setColor('#011eff')
        );
        } else {
            if(adminType === 'among') {
            await db
            .get('amongadmins')
            .push({
            discordUserId: newAdminId,
            })
            .write()
            return msg.channel.send(
                new Discord.MessageEmbed()
                    .setDescription(`:white_check_mark: Sucesso`)
                    .setFooter('Brabbot 2020', 'https://cdn.discordapp.com/attachments/719722218673799228/742718851610968155/download.png')
                    .setColor('#011eff')
            );
        } else {
            return msg.channel.send(
                new Discord.MessageEmbed()
                  .setTitle(':x: Comando Digitado de forma errada!')
                  .setColor('#011eff')
                );
        }
    }

   } catch(err) {
     console.log(err);
      return msg.channel.send(
        new Discord.MessageEmbed()
          .setDescription(`:x: Algo deu errado! Tente entrar em contato com o desenvolvedor.`)
          .setFooter('Brabbot 2020', 'https://cdn.discordapp.com/attachments/719722218673799228/742718851610968155/download.png')
          .setColor('#011eff')
      );
   }
}