const Discord = require('discord.js');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('db.json');
const db = low(adapter);

module.exports = async (client,msg) =>{
    try {
        const isAdmin = await db.get('amongadmins').find({discordUserId: msg.author.id}).value();
    if(!isAdmin) {
        return msg.channel.send(
            new Discord.MessageEmbed()
              .setDescription(`:x: Você não possui permissão!`)
              .setFooter('Brabbot 2020', 'https://cdn.discordapp.com/attachments/719722218673799228/742718851610968155/download.png')
              .setColor('#011eff')
          );
    }
    let voicechannel = msg.member.voice.channel;
    if(!voicechannel) {
        return msg.channel.send(
            new Discord.MessageEmbed()
              .setDescription(`:x: Você precisa estar em um canal de voz!`)
              .setFooter('Brabbot 2020', 'https://cdn.discordapp.com/attachments/719722218673799228/742718851610968155/download.png')
              .setColor('#011eff')
          );
    }
    voicechannel.members.forEach(member => {
        member.voice.setMute(true)
    }).catch(err =>{
        console.log(err);
      return msg.channel.send(
        new Discord.MessageEmbed()
          .setDescription(`:x: Algo deu errado (${member.name})! Eu posso estar sem permissão para silenciar pessoas!`)
          .setFooter('Brabbot 2020', 'https://cdn.discordapp.com/attachments/719722218673799228/742718851610968155/download.png')
          .setColor('#011eff')
      );
    });
    return msg.channel.send(
        new Discord.MessageEmbed()
          .setTitle(':white_check_mark: Sucesso!')
          .setColor('#011eff')
    );
    } catch (err) {
      console.log(err);
      return msg.channel.send(
        new Discord.MessageEmbed()
          .setDescription(`:x: Algo deu errado! Eu posso estar sem permissão para silenciar pessoas!`)
          .setFooter('Brabbot 2020', 'https://cdn.discordapp.com/attachments/719722218673799228/742718851610968155/download.png')
          .setColor('#011eff')
      );
    }
}