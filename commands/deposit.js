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

		const deposit_number = msg.content.split(' ').slice(1);
		if (!deposit_number || 0 === deposit_number.length || isNaN(deposit_number) === true) {
			return msg.channel.send(
				new Discord.MessageEmbed()
					.setTitle(':x: Quantia não informada corretamente!')
					.setColor('#011eff')
					.setFooter('Brabbot 2021', 'https://cdn.discordapp.com/avatars/823899858942951486/6b63aa8ed16856c2d74023323b4d0394.webp')
			)
		}

		if (money === 0 || parseInt(deposit_number) <= 0 || parseInt(deposit_number) > money) {
			return msg.channel.send(
				new Discord.MessageEmbed()
					.setDescription(`:x: Dinheiro insuficiente ou quantia errada!`)
					.setFooter('Brabbot 2021', 'https://cdn.discordapp.com/avatars/823899858942951486/6b63aa8ed16856c2d74023323b4d0394.webp')
					.setColor('#011eff')
			);
		}

		const new_quantity = balance + parseInt(deposit_number);
		const new_money = money - parseInt(deposit_number)

		await db.get('users').find({ discordUserId: msg.author.id }).assign({ balance: new_quantity }).write();
		await db.get('users').find({ discordUserId: msg.author.id }).assign({ money: new_money }).write();



		return msg.channel.send(
			new Discord.MessageEmbed()
				.setDescription(`:white_check_mark: Sucesso, ${deposit_number}$ foram depositados em seu banco.`)
				.setFooter('Brabbot 2021', 'https://cdn.discordapp.com/avatars/823899858942951486/6b63aa8ed16856c2d74023323b4d0394.webp')
				.setColor('#011eff')
		);

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