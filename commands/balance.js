const Discord = require('discord.js');
const low = require('lowdb');
const shortid = require('shortid');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('db.json');
const db = low(adapter);

module.exports = async (client, msg) => {
	try {
		const user = await db.get('users').find({ discordUserId: msg.author.id }).value();
		var money = user.money;
		var balance = user.balance;

		const default_money = 1000;
		const default_balance = 5000;

		if (!money) {
			await db
				.get('users')
				.find({ discordUserId: msg.author.id })
				.push({
					money: default_money,
				})
				.write()
				.id

			money = default_money;
		}
		if (!balance) {
			await db
				.get('users')
				.find({ discordUserId: msg.author.id })
				.push({
					balance: default_balance,
				})
				.write()
				.id

			balance = default_balance;
		}

		let embed = new Discord.MessageEmbed()
			.setTitle(`💰 Seu saldo:`)
			.setDescription('Aqui está seu saldo:')
			.setFooter('Brabbot 2021', 'https://cdn.discordapp.com/avatars/823899858942951486/6b63aa8ed16856c2d74023323b4d0394.webp')
			.setColor('#011eff')

		embed.addField('💵 Dinheiro: ', `$${money}`);
		embed.addField('🏦 Banco: ', `$${balance}`);
		return msg.channel.send(embed);

	} catch (err) {

		console.log(err);
		return msg.channel.send(
			new Discord.MessageEmbed()
				.setDescription(`:x: Algo deu errado! Tente entrar em contato com o desenvolvedor.`)
				.setFooter('Brabbot 2021', 'https://cdn.discordapp.com/avatars/823899858942951486/6b63aa8ed16856c2d74023323b4d0394.webp')
				.setColor('#011eff')
		);
	}
};