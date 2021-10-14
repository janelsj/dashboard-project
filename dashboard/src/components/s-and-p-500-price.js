import React, {useState, useEffect} from 'react';
import API from '../common_functions/axios';
import Graph from '../common_functions/graphing';
import moment from 'moment';

function SnP500(){
  const [xAxis, setXAxis] = useState([]);
  const [yAxis, setYAxis] = useState([]);

async function getSnP500Data() {
  const snp500Data = await API.get('', {
          headers: {'x-rapidapi-key': '956f29f902mshec9c7d274d0cce0p1074e5jsnc6ab53dcf3ad'}, //Hansen key
          params: {
            function: 'TIME_SERIES_WEEKLY', 
            symbol: 'SPY', 
            //outputsize: 'compact'
          }
      });
   return snp500Data;
  }

  useEffect(()=>{
    let xValuesArray = [];
    let yValuesArray = [];

    getSnP500Data().then(response => {
      //console.log(response.data);
        for (let eachDate in response.data['Weekly Time Series']){
          if (moment(eachDate).isSameOrAfter('2019-W01-1')) {
            xValuesArray.push(eachDate);
            yValuesArray.push(response.data['Weekly Time Series'][eachDate]['4. close']);
          }  
        }
        setXAxis(xValuesArray);
        setYAxis(yValuesArray);
    });
}, []);
    
    return(<>
      <div className="div-header">
        <h2>S&P 500 Price</h2>
        <h4>Latest Closing Price : {Math.round(yAxis[0] * 100) / 100} USD <br/> Last Retrieved On : {moment(xAxis[0]).format('Do MMMM YYYY')}</h4>
      </div>
        <Graph 
             x={xAxis}
             y={yAxis}
            color='#299617'
            chartTitle={"Weekly Time Series of S&P 500 (in USD)"}
        />
    </>)
}

export default SnP500;