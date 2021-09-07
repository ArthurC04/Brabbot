const Discord = require('discord.js');
const commandsScript  = require('../scripts/commandsReader');

const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('db.json');
const db = low(adapter);

module.exports = async (client,msg) =>{
    const havePrefix = await db.get('prefixes').find({guildId: msg.guild.id}).value();
    var prefix;

    if(!havePrefix){
        prefix = '@';
    } else {
        prefix = havePrefix.prefix;
    }

    const descriptions = {
        [`${prefix}help`]: 'Lista dos comandos!',
        [`${prefix}clear`]: 'Limpar o chat!',
        [`${prefix}covid`]: 'Mostra a situação da covid no Brasil!',
        [`${prefix}inventario`]: 'Mostra seu inventário',
        [`${prefix}ping`]:  'Ver o ping do bot!',
        [`${prefix}mudarprefixo`]: 'Mude o prefixo padrão do bot (@) para outro de sua preferência!',
				[`${prefix}buystock`]: 'Compre ações! Exemplo: @buystock CÓDIGO QUANTIDADE'
    };

    const response = new Discord.MessageEmbed()
        .setTitle(':thinking: Ajuda!')
        .setDescription(`Quais são meus comandos e o que eles fazem:`)
        .setColor('#011eff')
        .setFooter('Brabbot 2020', 'https://cdn.discordapp.com/avatars/823899858942951486/6b63aa8ed16856c2d74023323b4d0394.webp')
    
    const commands = commandsScript(prefix);
    Object.keys(commands).forEach(command => {
        if(command.startsWith(`${prefix}admin`) === false) {
            response.addField(`\n ${command}:`, `${descriptions[command] ? descriptions[command] : 'Nenhuma descrição!'}`)
        }
    });
    msg.channel.send(response);
};