import React, {useState, useEffect} from 'react';
import Plot from 'react-plotly.js';
import API from './API';
import Papa from 'papaparse';

function BitCoin(){

    const [xAxis, setXAxis] = useState([]);
    const [yAxis, setYAxis] = useState([]);
    const [market, setMarket] = useState('SGD,Singapore Dollar');
    const [symbol, setSymbol] = useState('BTC,Bitcoin');

    async function getBitCoinData() {
        return await API.get('', {
            params: {market: market.split(",")[0], symbol: symbol.split(",")[0], function: 'DIGITAL_CURRENCY_DAILY', outputsize: 'compact'}
        });
    }

    /* Function to create dropdown list from array created from csv */
        const selection = (selectElementName, arrayList) => {
            let option = document.createElement("option");
            option.value = "";
            option.text = "Select currency";
            selectElementName.append(option);
            arrayList.forEach(item => {
                option = document.createElement("option");
                option.value = `${item['currency code']},${item['currency name']}`;
                option.text = `${item['currency code']} (${item['currency name']})`;
                selectElementName.append(option);
            })
        };

    /* Function to get values for dropdown lists from csv files */
        const getDatafromCSV = (filePathName, arrayName, DOMElementName) => {
            Papa.parse(`/dashboard-project/data/${filePathName}_currency_list.csv`, {
                download: true,
                header: true,
                step: (result) => arrayName.push(result.data),
                complete: (results) => {
                    results.data = arrayName;
                    // console.log(results.data);
                    selection(document.querySelector(`select[name=${DOMElementName}]`), results.data);
                }
            });
        };

    useEffect(()=>{
    /* Get values for dropdown lists from each csv file */
        let physicalCurrArray = [];
        let digitalCurrArray = [];
        getDatafromCSV('physical', physicalCurrArray, 'physicalCurrency');
        getDatafromCSV('digital', digitalCurrArray, 'digitalCurrency');

    /* Get values for Graph from API*/
        let xValuesArray = [];
        let yValuesArray = [];
        getBitCoinData().then(response => {
            if (response.data["Error Message"]) {
                alert("Invalid selection. Please select another cryptocurrency.")
            } else {
                for (let eachDate in response.data['Time Series (Digital Currency Daily)']){
                    // console.log(response.data['Time Series (Digital Currency Daily)'][eachDate][`4a. close (${market.split(",")[0]})`]);
                    xValuesArray.push(eachDate);
                    yValuesArray.push(response.data['Time Series (Digital Currency Daily)'][eachDate][`4a. close (${market.split(",")[0]})`]);
                }
                setXAxis(xValuesArray);
                setYAxis(yValuesArray);
            }
        });

        return () => console.log("exit");

    },[market, symbol]);
    
    return(<div id="bitcoin">
        <h3>{'Digital \& Crypto Currency'}</h3>
        <div className="selection">
            <label htmlFor="physicalCurrency">Choose physical currency: </label>
            <select name="physicalCurrency" onChange={e => setMarket(e.target.options[e.target.selectedIndex].value)}></select>
            <label htmlFor="digitalCurrency">Choose digital currency: </label>
            <select name="digitalCurrency" onChange={e => setSymbol(e.target.options[e.target.selectedIndex].value)}></select> 
        </div>
        <Plot
            data={[
              {
                x: xAxis,
                y: yAxis,
                type: 'scatter',
                mode: 'lines+markers',
                marker: {color: 'blue'},
              },
            ]}
            layout={{width: 800, height: 600, title: `Daily Time Series of ${symbol.split(",")[1]} valuation (in ${market.split(",")[1]})`}}
          />
    </div>)
}

export default BitCoin;