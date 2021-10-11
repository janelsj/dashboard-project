// var axios = require('axios');
// const API = axios.create({
//     baseURL: "https://alpha-vantage.p.rapidapi.com/query",
//     headers: {
//         'x-rapidapi-host': 'alpha-vantage.p.rapidapi.com',
//         'x-rapidapi-key': '2cc4f9fb5fmsh6c7c17f151bdaa1p1f3fb7jsne9ae56177c97'
//       }
// });

// const data = async() => {
//     await API.get('', {
//         params: {market: 'SGD', symbol: 'BTC', function: 'DIGITAL_CURRENCY_DAILY'}
//     }).then(response => {
//         console.log(response.data);
//         for (eachDate in response.data['Time Series (Digital Currency Daily)']){
//             console.log(response.data['Time Series (Digital Currency Daily)'][eachDate]['1a. open (SGD)']);
//         }
//     })
// };

// data();

// import React from 'react';
// import Plot from 'react-plotly.js';

// class Graph extends React.Component {
//     render() {
//         return (
//           <Plot
//             data={[
//               {
//                 x: [1, 2, 3],
//                 y: [2, 6, 3],
//                 type: 'scatter',
//                 mode: 'lines+markers',
//                 marker: {color: 'red'},
//               },
//               {type: 'bar', x: [1, 2, 3], y: [2, 5, 3]},
//             ]}
//             layout={{width: 320, height: 240, title: 'A Fancy Plot'}}
//           />
//         );
//       }
// }

// export default Graph;