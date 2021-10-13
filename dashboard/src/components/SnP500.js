import React, {useState, useEffect} from 'react';
import API from './API';
import Plot from 'react-plotly.js';

function SnP500(){
  const [xAxis, setXAxis] = useState([]);
  const [yAxis, setYAxis] = useState([]);

async function getSnP500Data() {
  const snp500Data = await API.get('', {
          params: {
            function: 'TIME_SERIES_DAILY', 
            symbol: 'SPY', 
            outputsize: 'compact'
          }
      });
   return snp500Data;
  }

  useEffect(()=>{
    let xValuesArray = [];
    let yValuesArray = [];

    getSnP500Data().then(response => {
      console.log(response.data);
        for (let eachDate in response.data['Time Series (Daily)']){
            xValuesArray.push(eachDate);
            yValuesArray.push(response.data['Time Series (Daily)'][eachDate]['4. close']);
        }
        setXAxis(xValuesArray);
        setYAxis(yValuesArray);
    });
},[]);
    
    return(
      <div>
           <Plot
             data={[
               {
                x: xAxis,
                y: yAxis,
                type: 'scatter',
                mode: 'lines+points',
                marker: {color: '#299617'},
               }
             ]}
             layout={{width: 350, height: 300, title: `<b>S&P 500</b> <br> Price: ${Math.round(yAxis[0] * 100) / 100} USD <br> Date: ${xAxis[0]}`}}
           />
         </div>
    )
}

export default SnP500;