const Discord = require('discord.js');

module.exports = async (client,msg) =>{
    const channel   = msg.channel;
    const args = msg.content.split(' ').slice(1); 
    const amount = args.join(' '); 
    
    if (!amount){
        const embed = new Discord.MessageEmbed()
        .setTitle(':x: Erro')
        .setDescription(`Você precisa me dizer quantas mensagens devo apagar!`)
	    .setFooter('Brabbot 2020', 'https://cdn.discordapp.com/attachments/719722218673799228/742718851610968155/download.png')
        .setColor('#011eff')
        msg.channel.send(embed);
        return;
    }

    if (isNaN(amount)){
        const embed = new Discord.MessageEmbed()
        .setTitle(':x: Erro')
        .setDescription(`Você não digitou corretamente o número de mensagens que quer apagar!`)
	    .setFooter('Brabbot 2020', 'https://cdn.discordapp.com/attachments/719722218673799228/742718851610968155/download.png')
        .setColor('#011eff')
        msg.channel.send(embed);
        return;
    }
    
    if (amount > 100){
        const embed = new Discord.MessageEmbed()
        .setTitle(':x: Erro')
        .setDescription(`Só consigo apagar até 100 mensagens!`)
	    .setFooter('Brabbot 2020', 'https://cdn.discordapp.com/attachments/719722218673799228/742718851610968155/download.png')
        .setColor('#011eff')
        msg.channel.send(embed);
        return;
    }

    if (amount < 1){
        const embed = new Discord.MessageEmbed()
        .setTitle(':x: Erro')
        .setDescription(`O mínimo de mensagens a serem apagadas é uma!`)
	    .setFooter('Brabbot 2020', 'https://cdn.discordapp.com/attachments/719722218673799228/742718851610968155/download.png')
        .setColor('#011eff')
        msg.channel.send(embed);
        return;
    }
		await channel.messages.fetch({ limit: amount }).then(messages => { 
        channel.bulkDelete(messages).then(response => {
            const embed = new Discord.MessageEmbed()
            .setTitle(':white_check_mark: Sucesso!')
            .setDescription(`${amount} mensagens deletadas com sucesso!`)
	        .setFooter('Brabbot 2020', 'https://cdn.discordapp.com/attachments/719722218673799228/742718851610968155/download.png')
            .setColor('#011eff')
            msg.channel.send(embed);
            return;
        }).catch(err => {
            const embed = new Discord.MessageEmbed()
            .setTitle(':x: Erro')
            .setDescription(`Algo deu errado, talvez você esteja tentando apagar mensagens antigas.`)
	        .setFooter('Brabbot 2020', 'https://cdn.discordapp.com/attachments/719722218673799228/742718851610968155/download.png')
            .setColor('#011eff')
            msg.channel.send(embed);
            return;
        });
    });
}