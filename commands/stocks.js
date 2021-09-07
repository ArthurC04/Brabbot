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
		const stocks = await db.get('stocks').value();

		let embed = new Discord.MessageEmbed()
			.setTitle(`💱 Ações:`)
			.setDescription('Aqui estão as ações disponíveis')
			.setFooter('Brabbot 2021', 'https://cdn.discordapp.com/avatars/823899858942951486/6b63aa8ed16856c2d74023323b4d0394.webp')
			.setColor('#011eff')
		stocks.forEach(stock => {
			embed.addField(`${emoji(stock.emojiId)} ${stock.code} - ${stock.name}`, `Valor: ${stock.value}$`, true);
			embed.addField(`📦 Quantidade disponível: ${stock.available}`, `💳 Valor de mercado: ${(stock.quantity - stock.available) * stock.value}$`, true)
			embed.addField('💻 Sobre: ', `${stock.info}`)
		});
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