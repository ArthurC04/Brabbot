const Discord = require('discord.js');
const fs = require('fs');
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
                  .setFooter('Brabbot 2020', 'https://cdn.discordapp.com/avatars/823899858942951486/6b63aa8ed16856c2d74023323b4d0394.webp')
                  .setColor('#011eff')
              );
        } else {
            const database = new Discord.MessageAttachment('./db.json');
            msg.author.send('```(CONFIDENCIAL)⚠️Database atual:```', database);
            return msg.channel.send(
                new Discord.MessageEmbed()
                  .setDescription(`:white_check_mark:A database foi enviada em seu privado!`)
                  .setFooter('Brabbot 2020', 'https://cdn.discordapp.com/avatars/823899858942951486/6b63aa8ed16856c2d74023323b4d0394.webp')
                  .setColor('#011eff')
              );
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