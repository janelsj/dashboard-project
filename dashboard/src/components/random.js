var axios = require("axios").default;

var options = {
  method: 'GET',
  url: 'https://alpha-vantage.p.rapidapi.com/query',
  params: {
    from_symbol: 'EUR',
    function: 'FX_DAILY',
    to_symbol: 'USD',
    outputsize: 'compact',
    datatype: 'json'
  },
  headers: {
    'x-rapidapi-host': 'alpha-vantage.p.rapidapi.com',
    'x-rapidapi-key': '2cc4f9fb5fmsh6c7c17f151bdaa1p1f3fb7jsne9ae56177c97'
  }
};

axios.request(options).then(function (response) {
	console.log(response.data);
}).catch(function (error) {
	console.error(error);
});

// getForexData().then(response => {
//     if (response.data["Error Message"]) {
//         alert("Invalid selection. Please select another currency.")
//     } else {
//         console.log(response);
//     //     for (let eachDate in response.data['Time Series (Digital Currency Daily)']){
//     //         // console.log(response.data['Time Series (Digital Currency Daily)'][eachDate][`4a. close (${market.split(",")[0]})`]);
//     //         xValuesArray.push(eachDate);
//     //         yValuesArray.push(response.data['Time Series (Digital Currency Daily)'][eachDate][`4a. close (${market.split(",")[0]})`]);
//     //     }
//     //     setXAxis(xValuesArray);
//     //     setYAxis(yValuesArray);
//     }
// })