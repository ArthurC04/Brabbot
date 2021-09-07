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

		const withdrawn_number = msg.content.split(' ').slice(1);
		if (!withdrawn_number || 0 === withdrawn_number.length || isNaN(withdrawn_number) === true) {
			return msg.channel.send(
				new Discord.MessageEmbed()
					.setTitle(':x: Quantia não informada corretamente!')
					.setColor('#011eff')
					.setFooter('Brabbot 2021', 'https://cdn.discordapp.com/avatars/823899858942951486/6b63aa8ed16856c2d74023323b4d0394.webp')
			)
		}

		if (balance === 0 || parseInt(withdrawn_number) <= 0 || parseInt(withdrawn_number) > balance) {
			return msg.channel.send(
				new Discord.MessageEmbed()
					.setDescription(`:x: Dinheiro insuficiente ou quantia errada!`)
					.setFooter('Brabbot 2021', 'https://cdn.discordapp.com/avatars/823899858942951486/6b63aa8ed16856c2d74023323b4d0394.webp')
					.setColor('#011eff')
			);
		}

		const new_quantity = balance - parseInt(withdrawn_number);
		const new_money = money + parseInt(withdrawn_number)

		await db.get('users').find({ discordUserId: msg.author.id }).assign({ balance: new_quantity }).write();
		await db.get('users').find({ discordUserId: msg.author.id }).assign({ money: new_money }).write();



		return msg.channel.send(
			new Discord.MessageEmbed()
				.setDescription(`:white_check_mark: Sucesso, ${withdrawn_number}$ foram retirados do seu banco.`)
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