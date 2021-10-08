var axios = require('axios');
const API = axios.create({
    baseURL: "https://alpha-vantage.p.rapidapi.com/query",
    headers: {
        'x-rapidapi-host': 'alpha-vantage.p.rapidapi.com',
        'x-rapidapi-key': '2cc4f9fb5fmsh6c7c17f151bdaa1p1f3fb7jsne9ae56177c97'
      }
});

const data = async() => {
    await API.get('', {
        params: {market: 'SGD', symbol: 'BTC', function: 'DIGITAL_CURRENCY_DAILY'}
    }).then(response => {
        console.log(response.data);
        for (eachDate in response.data['Time Series (Digital Currency Daily)']){
            console.log(response.data['Time Series (Digital Currency Daily)'][eachDate]['1a. open (SGD)']);
        }
    })
};

data();