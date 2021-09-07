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

		const stock_code = msg.content.split(' ').slice(1)[0];
		const stock_quantity = msg.content.split(' ').slice(2)[0];
		if (isNaN(parseInt(stock_quantity)) === true || !stock_code || !stock_quantity || 0 === stock_quantity.length || 0 === stock_code.length) {
			return msg.channel.send(
				new Discord.MessageEmbed()
					.setTitle(':x: Código ou quantia não informados corretamente!')
					.setColor('#011eff')
					.setFooter('Brabbot 2021', 'https://cdn.discordapp.com/avatars/823899858942951486/6b63aa8ed16856c2d74023323b4d0394.webp')
			)
		}

		const stock_info = await db.get('stocks').find({ code: stock_code }).value();
		const stocks = await db.get('stocks').find().value();

		if (!stock_info) {
			return msg.channel.send(
				new Discord.MessageEmbed()
					.setDescription(`:x: Verifique o código da ação, para ajuda veja o comando help`)
					.setFooter('Brabbot 2021', 'https://cdn.discordapp.com/avatars/823899858942951486/6b63aa8ed16856c2d74023323b4d0394.webp')
					.setColor('#011eff')
			);
		}

		if (balance === 0 || balance < stock_info.value * stock_quantity || stock_info.available < stock_quantity) {
			return msg.channel.send(
				new Discord.MessageEmbed()
					.setDescription(`:x: Dinheiro insuficiente ou ação indisponível`)
					.setFooter('Brabbot 2021', 'https://cdn.discordapp.com/avatars/823899858942951486/6b63aa8ed16856c2d74023323b4d0394.webp')
					.setColor('#011eff')
			);
		}

		const new_balance = balance - stock_quantity * stock_info.value;
		const new_stock_available_quantity = stock_info.available - stock_quantity;

		await db.get('users').find({ discordUserId: msg.author.id }).assign({ balance: new_balance }).write();

		const user_stock_inventory = user.stocks;

		if (!user_stock_inventory) {
			await db
				.get('users')
				.find({ discordUserId: msg.author.id })
				.push({
					stocks: [],
				})
				.write()
				.id

			user_stock_inventory.push({ code: stock_info.code, quantity: parseInt(stock_quantity) });
		} else {
			var hasStock = false;
			user_stock_inventory.map(function (stock) {
				if (stock.code === stock_info.code) {
					stock.quantity = stock.quantity + parseInt(stock_quantity);
					hasStock = true;
				}
				if (hasStock = false) {
					user_stock_inventory.push({
						"code": stock_info.code,
						"quantity": parseInt(stock_quantity)
					});
				}
			})

		}

		const new_stock_value = stock_info.value + Math.floor(1 + Math.random() * (2 + 1 - 1));

		await db.get('stocks').find({ code: stock_code }).assign({ available: new_stock_available_quantity, value: new_stock_value }).write();

		return msg.channel.send(
			new Discord.MessageEmbed()
				.setDescription(`:white_check_mark: Sucesso, você comprou ${stock_quantity} ações de ${stock_info.code}`)
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