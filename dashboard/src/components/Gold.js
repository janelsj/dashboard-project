import API from '../common_functions/API';
import React, {useEffect, useState} from 'react';
import Plot from 'react-plotly.js';

//  fetchGold() {
//     API.get( '/owner')
//     const API_KEY = '03Q1B3D0MEHUO0ZQ';
//     let API_Call = 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=GLD&outputsize=full&apikey=${API_KEY}';
// };

function Gold() {
    const [xValuesFunction, setXValuesFunction] = useState([])
    const [yValuesFunction, setYValuesFunction] = useState([])

    useEffect (()=> {
        API.get('', {
            params: {
                function: 'TIME_SERIES_DAILY_ADJUSTED',
                symbol: 'GLD',
                datatype: 'json',
                output_size: 'compact'
              },
          })
          .then(function (response)
          {
            //   console.log(response);
            //   console.log(response.data);

              let xValuesFunction = [];
              let yValuesFunction = [];

              for (let key in response.data['Time Series (Daily)']){
                  xValuesFunction.push(key);
                  yValuesFunction.push(response.data['Time Series (Daily)'][key]['1. open']);
              }
            //   console.log(xValuesFunction);
            //   console.log(yValuesFunction);

              setXValuesFunction(xValuesFunction);
              setYValuesFunction(yValuesFunction);
          })

    }, []);

    console.log(xValuesFunction);
    console.log(yValuesFunction);

    return(<>
        <div>
            <h1>Gold Price</h1>

            <Plot
            data={[
            {
            x: xValuesFunction,
            y: yValuesFunction,
            type: 'scatter',
            mode: 'lines',
            marker: {color: '#d4af37'},
            },
        ]}
        layout={ {width: 650, height: 600, title: 'Plot of Gold'} }
      />
    
        </div>
    </>)
}

export default Gold;