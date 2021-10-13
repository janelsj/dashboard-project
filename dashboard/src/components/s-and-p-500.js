import React, {useState, useEffect} from 'react';
import API from '../common_functions/API';
import Graph from '../common_functions/Graph';
import moment from 'moment';

function SnP500(){
  const [xAxis, setXAxis] = useState([]);
  const [yAxis, setYAxis] = useState([]);

async function getSnP500Data() {
  const snp500Data = await API.get('', {
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
        <h2>S&P 500</h2>
      </div>
        <div className="graph">
        <Graph 
             x={xAxis}
             y={yAxis}
            color={'#299617'}
            chartTitle={`Price: ${Math.round(yAxis[0] * 100) / 100} USD <br> Date: ${xAxis[0]}`}
        />        
        </div>
    </>)
}

export default SnP500;