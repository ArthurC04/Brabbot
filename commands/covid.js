const Discord = require('discord.js');
const covidAPI = require('../apis/covid');

module.exports = async (client,msg) =>{
    function formatDate(data, formato) {
        if (formato == 'pt-br') {
          return (data.substr(0, 10).split('-').reverse().join('/'));
        } else {
          return (data.substr(0, 10).split('/').reverse().join('-'));
        }
    }
    
      covidAPI.get('/').then(async response => {
          const data = await response.data.infected;
          const data_update = await response.data.lastUpdatedAtSource;
          const confirmed = await response.data.infected;
          const deaths = await response.data.deceased;
          const recovered = await response.data.recovered;
    
          if(data === null || data_update === null || confirmed === null || deaths === null || recovered === null){
            msg.channel.send('Sem Informações no momento :(')
          };
    
          const covid = new Discord.MessageEmbed()
          .setTitle('Covid-19 no Brasil')
          .setThumbnail('https://www.gov.br/pt-br/noticias/saude-e-vigilancia-sanitaria/2020/03/entenda-a-diferenca-entre-coronavirus-covid-19-e-novo-coronavirus/mitosis-3876669_1920.jpg/@@images/10852f76-0ff0-436b-8ab0-f9ed27b09f9e.png')
          .addField("⭕Casos Ativos:", data - recovered)
          .addField("✅Casos confirmados:", confirmed)
          .addField("💀Mortes:", deaths)
          .setColor('#011eff')
          .addField("🙌Recuperações:", recovered)
          .addField("🕒Última atualização:", formatDate(data_update, 'pt-br'))
          .setFooter('#STAYHOME');
    
          await msg.channel.send(covid);
        });
}