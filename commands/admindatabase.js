const Discord = require('discord.js');
const fs = require('fs');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('db.json');
const db = low(adapter);

module.exports = async (client,msg) =>{
    try {
        const isAdmin = await db.get('admins').find({id: msg.author.id}).value();
        if(!isAdmin) {
            return msg.channel.send(
                new Discord.MessageEmbed()
                  .setDescription(`:x: Você não possui permissão!`)
                  .setFooter('Brabbot 2020', 'https://cdn.discordapp.com/attachments/719722218673799228/742718851610968155/download.png')
                  .setColor('#011eff')
              );
        } else {
            const database = new Discord.MessageAttachment('./db.json');
            return msg.channel.send('```(CONFIDENCIAL)⚠️Database atual:```', database);
        }   
    } catch (err) {
        console.log(err);
        return msg.channel.send(
            new Discord.MessageEmbed()
              .setDescription(`:x: Algo deu errado! Tente entrar em contato com o desenvolvedor.`)
              .setFooter('Brabbot 2020', 'https://cdn.discordapp.com/attachments/719722218673799228/742718851610968155/download.png')
              .setColor('#011eff')
          );
    }
}