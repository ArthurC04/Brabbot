const Discord = require('discord.js');
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


    const numbers =  msg.content.slice(prefix.length).trim().split(/ +/g);
    numbers.splice(0, 1); //REMOVE COMMAND NAME FROM ARRAY

    const a = parseInt(numbers[0]);
    const b = parseInt(numbers[1]);
    const c = parseInt(numbers[2]);

    const resultDelta = (b * b) -4 * a * c;
    const resultDeltaRaiz = Math.sqrt(resultDelta);

    let resultFinal1 = (-b + resultDeltaRaiz) / (2 * a);
    let resultFinal2 = (-b - resultDeltaRaiz) / (2 * a);

    if(isNaN(resultFinal1 === true) || isNaN(resultFinal2) === true){
      resultFinal1 = 'Algo deu errado.';
      resultFinal2 = 'Algo deu errado.';
    }

    if(numbers.length < 3||numbers.length > 3){
      if(isNaN(resultDeltaRaiz === true)){
        return msg.channel.send(
          new Discord.MessageEmbed()
            .setDescription(`Δ: RAIZ NEGATIVA.`)
            .setFooter('Brabbot 2020', 'https://cdn.discordapp.com/attachments/719722218673799228/742718851610968155/download.png')
            .setColor('#011eff')
        )
      } else {
        return msg.channel.send(
          new Discord.MessageEmbed()
            .setDescription(`Campos Incorretos. Como utilizar: --calcularequação A B C`)
            .setFooter('Brabbot 2020', 'https://cdn.discordapp.com/attachments/719722218673799228/742718851610968155/download.png')
            .setColor('#011eff')
        )
      }
    } else {
      if(isNaN(resultDeltaRaiz) === true){
        return msg.channel.send(
          new Discord.MessageEmbed()
            .setDescription(`Δ: RAIZ NEGATIVA, sem soluções em R ou campos incorretos.`)
            .setFooter('Brabbot 2020', 'https://cdn.discordapp.com/attachments/719722218673799228/742718851610968155/download.png')
            .setColor('#011eff')
        )
      } else {       
        return msg.channel.send(
          new Discord.MessageEmbed()
            .addField('Δ:', `√${resultDelta}`)
            .addField('ΔResolvido:', `${resultDeltaRaiz}`)
            .addField('X1:', `${resultFinal1}`)
            .addField('X2', `${resultFinal2}`)
            .addField('⚠️ATENÇÃO', 'Verifique o resultado Final!')
            .setFooter('Brabbot 2020', 'https://cdn.discordapp.com/attachments/719722218673799228/742718851610968155/download.png')
            .setColor('#011eff')
        )
      }
    }
}