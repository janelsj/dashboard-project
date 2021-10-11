import API from './API';
import React from 'react';
import Plot from 'react-plotly.js';

// function SnP500(){
//     return(<>
//         Content for SnP500
//     </>)
// }

class SnP500 extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        stockChartXValues: [],
        stockChartYValues: []
      }
    }
    
    componentDidMount() {
      this.fetchStock();
    }
  
    fetchStock() {
      const pointerToThis = this;
      console.log(pointerToThis);
      const API_KEY = 'HGJWFG4N8AQ66ICD';
      const stockSymbol = 'SPY';
      let API_Call = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${stockSymbol}&outputsize=compact&apikey=${API_KEY}`;
      let stockChartXValuesFunction = [];
      let stockChartYValuesFunction = [];
  
      fetch(API_Call)
        .then(
          function(response) {
            return response.json();
          }
        )
        .then(
          function(data) {
            console.log(data);
  
            for (let key in data['Time Series (Daily)']) {
              stockChartXValuesFunction.push(key);
              stockChartYValuesFunction.push(data['Time Series (Daily)'][key]['4. close']);
            }
  
            pointerToThis.setState({
              stockChartXValues: stockChartXValuesFunction,
              stockChartYValues: stockChartYValuesFunction
            });
          }
        )
    }
  
    render() {
      return (
        <div>
          <Plot
            data={[
              {
                x: this.state.stockChartXValues,
                y: this.state.stockChartYValues,
                type: 'scatter',
                mode: 'lines+points',
                marker: {color: '#299617'},
              }
            ]}
            layout={{width: 350, height: 300, title: `S&P 500<br><br> ${this.state.stockChartYValues[0]} USD`}}
          />
        </div>
      )
    }
  }
  
export default SnP500;