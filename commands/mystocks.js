const Discord = require('discord.js');
const low = require('lowdb');
const shortid = require('shortid');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('db.json');
const db = low(adapter);

module.exports = async (client, msg) => {
	try {
		function emoji(id) {
			return client.emojis.cache.get(id).toString();
		}
		const user = await db.get('users').find({ discordUserId: msg.author.id }).value();

		if (!user) {
			await db
				.get('users')
				.push({
					id: shortid.generate(),
					discordUserId: msg.author.id,
					items: [],
					stocks: [],
				})
				.write()
				.id
			return msg.channel.send(
				new Discord.MessageEmbed()
					.setDescription(`:x: Você não possui nenhuma ação!`)
					.setFooter('Brabbot 2021', 'https://cdn.discordapp.com/avatars/823899858942951486/6b63aa8ed16856c2d74023323b4d0394.webp')
					.setColor('#011eff')
			);
		}
		var player_stocks = [];
		for (let i = 0; i < user.stocks.length; i++) {
			const stock_info = await db.get('stocks').find({ code: user.stocks[i].code }).value();
			player_stocks.push({ ...stock_info, quantity: user.stocks[i].quantity });
		}
		let embed = new Discord.MessageEmbed()
			.setTitle(`💱 Suas ações:`)
			.setDescription('Aqui estão suas ações disponíveis')
			.setFooter('Brabbot 2021', 'https://cdn.discordapp.com/avatars/823899858942951486/6b63aa8ed16856c2d74023323b4d0394.webp')
			.setColor('#011eff')
		player_stocks.forEach(stock => {
			embed.addField(`${emoji(stock.emojiId)} ${stock.code} - ${stock.name}`, `Quantidade: ${stock.quantity}`, true);
			embed.addField(`💳 Valor atual: `, `${stock.value}$`, true);
			embed.addField(`💵 Total: `, `${stock.value * stock.quantity}$`, true);
		})
		msg.channel.send(embed);
	} catch (err) {
		console.log(err);
		return msg.channel.send(
			new Discord.MessageEmbed()
				.setDescription(`:x: Algo deu errado! Tente entrar em contato com o desenvolvedor.`)
				.setFooter('Brabbot 2021', 'https://cdn.discordapp.com/avatars/823899858942951486/6b63aa8ed16856c2d74023323b4d0394.webp')
				.setColor('#011eff')
		);
	}
}