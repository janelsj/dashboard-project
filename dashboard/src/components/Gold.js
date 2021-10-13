import API from '../common_functions/API';
import React, {useEffect, useState} from 'react';
import Plot from 'react-plotly.js';
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
          </div>
          <div className="graph">
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