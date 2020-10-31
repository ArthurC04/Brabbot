const Discord = require('discord.js');
const low = require('lowdb');
const shortid = require('shortid');
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
    }

    const taggedUser = msg.mentions.users.first();
    const args = msg.content.split(' ').slice(1); 
    const itemName = args[1];

    if(!taggedUser || !args[1]||args.length > 2){
        return msg.channel.send(
          new Discord.MessageEmbed()
            .setTitle(':x: Comando Digitado de forma errada!')
            .setColor('#011eff')
          );
    } else {
      const taggedUserInventory = await db.get('users').find({discordUserId: taggedUser.id}).value();
    const item_info = await db.get('items').find({name: itemName}).value();
    if(!item_info) {
        return msg.channel.send(
            new Discord.MessageEmbed()
              .setTitle(':x: Este item não existe!')
              .setColor('#011eff')
        );
    } else {
      if(!taggedUserInventory) {
        await db
        .get('users')
        .push({
            id: shortid.generate(),
            discordUserId: taggedUser.id,
            inventory: [{id: item_info.id, quantity: '1'}],
        })
        .write()
        .id
          return msg.channel.send(
              new Discord.MessageEmbed()
                .setTitle(':white_check_mark: Sucesso!')
                .setColor('#011eff')
          );
      } else {
        const taggedUserHaveItem = await  db
        .get('users')
        .find({ discordUserId: taggedUser.id })
        .get('inventory')
        .find({id: item_info.id})
        .value();

        if(!taggedUserHaveItem) {
              let inventory = db.get('users').find({ discordUserId: taggedUser.id }).get('inventory').value();
              inventory.push({id: item_info.id, quantity: '1'});
              db.get('users').find({ discordUserId: taggedUser.id }).assign({ inventory }).write();
              return msg.channel.send(
                new Discord.MessageEmbed()
                  .setTitle(':white_check_mark: Sucesso!')
                  .setColor('#011eff')
              );
        } else {
          await db.get('users')
          .find({discordUserId: taggedUser.id})
          .get('inventory').find({ id: item_info.id})
          .assign({'quantity': `${parseInt(taggedUserHaveItem.quantity) + 1}`})
          .write();

              return msg.channel.send(
                new Discord.MessageEmbed()
                  .setTitle(':white_check_mark: Sucesso!')
                  .setColor('#011eff')
            );
        } 
        }
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