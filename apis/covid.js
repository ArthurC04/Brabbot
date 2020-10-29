const  axios = require('axios');

const covidAPI = axios.create({
    baseURL: 'https://api.apify.com/v2/key-value-stores/TyToNta7jGKkpszMZ/records/LATEST?disableRedirect=true',
});

module.exports = covidAPI;