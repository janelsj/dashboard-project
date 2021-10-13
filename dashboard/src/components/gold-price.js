import API from '../common_functions/api';
import React, {useEffect, useState} from 'react';
import Graph from '../common_functions/graph';
import moment from 'moment';

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
            headers: {'x-rapidapi-key': '956f29f902mshec9c7d274d0cce0p1074e5jsnc6ab53dcf3ad'}, //Hansen key
            params: {
                function: 'TIME_SERIES_WEEKLY',
                symbol: 'GLD',
                datatype: 'json',
                // output_size: 'compact'
              },
          })
          .then(function (response)
          {
            //   console.log(response);
              // console.log(response.data);

              let xValuesFunction = [];
              let yValuesFunction = [];

              for (let key in response.data['Weekly Time Series']){
                    if (moment(key).isSameOrAfter('2019-W01-1')) {
                      xValuesFunction.push(key);
                      yValuesFunction.push(response.data['Weekly Time Series'][key]['4. close']);
                    }
              }
            //   console.log(xValuesFunction);
            //   console.log(yValuesFunction);

              setXValuesFunction(xValuesFunction);
              setYValuesFunction(yValuesFunction);
          })

    }, []);

    // console.log(xValuesFunction);
    // console.log(yValuesFunction);

    return(<>
          <div className="div-header">
            <h2>Gold Price</h2>
            <h4>Latest Closing Price : {parseFloat(yValuesFunction[0]).toFixed(2)} USD <br/> Last Retrieved On : {xValuesFunction[0]}</h4>
          </div>
            <Graph 
              x={xValuesFunction}
              y={yValuesFunction}
              color='#d4af37'
              chartTitle="Weekly Time Series of Gold (in USD)"
            />
    </>)
}

export default Gold;