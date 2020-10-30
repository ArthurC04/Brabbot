const Discord = require('discord.js');
const low = require('lowdb');
const shortid = require('shortid');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('db.json');
const db = low(adapter);

module.exports = async (client,msg) =>{
    try {
        function emoji(id) {
            return client.emojis.cache.get(id).toString();
        }
        const haveInventory = await db.get('inventories').find({discordUserId: msg.author.id}).value();
        if(!haveInventory){
            await db
            .get('inventories')
            .push({
                id: shortid.generate(),
                discordUserId: msg.author.id,
                items: [],
            })
            .write()
            .id
            return msg.channel.send(
                new Discord.MessageEmbed()
                  .setDescription(`:x: Você não possui nenhum item em seu inventário!`)
                  .setFooter('Brabbot 2020', 'https://cdn.discordapp.com/attachments/719722218673799228/742718851610968155/download.png')
                  .setColor('#011eff')
              );
        } else {
            var player_inventory = [];
            for(let i = 0; i < haveInventory.inventory.length; i++) {
                const item_info = await db.get('items').find({id: haveInventory.inventory[i].id}).value();
                player_inventory.push({...item_info, quantity: haveInventory.inventory[i].quantity});
            }
            let embed = new Discord.MessageEmbed()
            .setTitle(`🎒 Seu inventário:`)
            .setDescription('Aqui estão seus itens:')
            .setFooter('Brabbot 2020', 'https://cdn.discordapp.com/attachments/719722218673799228/742718851610968155/download.png')
            .setColor('#011eff')
            player_inventory.forEach(item => {
                embed.addField(`${emoji(item.emojiId)} ${item.name}`, `Quantidade: ${item.quantity}`);
            });
            msg.channel.send(embed);
        }
    } catch {
        return msg.channel.send(
            new Discord.MessageEmbed()
              .setDescription(`:x: Algo deu errado! Tente entrar em contato com o desenvolvedor.`)
              .setFooter('Brabbot 2020', 'https://cdn.discordapp.com/attachments/719722218673799228/742718851610968155/download.png')
              .setColor('#011eff')
          );
    }
}