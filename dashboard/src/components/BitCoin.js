import React, {useState, useEffect} from 'react';
import Plot from 'react-plotly.js';
import API from './API';
import { CSVReader } from 'react-papaparse';
// import { getJsonFromCsv } from 'convert-csv-to-json/src/index';

function BitCoin(){

    const [xAxis, setXAxis] = useState([]);
    const [yAxis, setYAxis] = useState([]);
    const [market, setMarket] = useState('SGD');
    const [symbol, setSymbol] = useState('BTC');

    async function getBitCoinData() {
        return await API.get('', {
            params: {market, symbol, function: 'DIGITAL_CURRENCY_DAILY', outputsize: 'compact'}
        });
    }

    /* Function to create dropdown list from array created from csv */
    // function selection(selectElementName, arrayList) {
    //     let option = document.createElement("option");
    //     option.value = "";
    //     option.text = "Select currency";
    //     selectElementName.append(option);
    //     arrayList.forEach((item) => {
    //         option = document.createElement("option");
    //         option.value = item;
    //         option.text = item;
    //         selectElementName.append(option);
    //     })
    // }

    /* Function to get value of item selected from the dropdown list */
    // function getValue(dropDownList) {
    //     return dropDownList.options[dropDownList.selectedIndex].value;
    // };

    /* React-papaparse library */
    // let array = Papa.parse('../data/physical_currency_list.csv', {download:true});
    //  console.log(array)

    /* converst-csv-to-json library */
    // const digitalCurrInput = '../data/digital_currency_list.csv'; 
    // const digitalCurrOutput = '../data/digital_currency_list.json';

    // const physicalCurrInput = '../data/physical_currency_list.csv'; 
    // const physicalCurrOutput = '../data/physical_currency_list.json';

    // generateJsonFileFromCsv(digitalCurrInput, digitalCurrOutput);
    // generateJsonFileFromCsv(physicalCurrInput, physicalCurrOutput);

    // let json = getJsonFromCsv("../data/physical_currency_list.csv");
    //     for(let i=0; i<json.length;i++) {
    //         console.log(json[i]);
    //     }

    useEffect(()=>{
        // selection(document.querySelector('select[name="physicalCurrency"]'), physicalCurrOutput);
        // selection(document.querySelector('select[name="digitalCurrency"]'), digitalCurrOutput);
        let xValuesArray = [];
        let yValuesArray = [];
        getBitCoinData().then(response => {
            for (let eachDate in response.data['Time Series (Digital Currency Daily)']){
                console.log(response.data['Time Series (Digital Currency Daily)'][eachDate][`4a. close (${market})`]);
                xValuesArray.push(eachDate);
                yValuesArray.push(response.data['Time Series (Digital Currency Daily)'][eachDate][`4a. close (${market})`]);
            }
            setXAxis(xValuesArray);
            setYAxis(yValuesArray);
        });
        return () => console.log("exit");
    },[xAxis, yAxis, market, symbol]);
    
    return(<div id="bitcoin">
        Content for BitCoin <br/> <br/>
        {/* <button onClick={refresh}>Refresh</button> */}
        <label htmlFor="physicalCurrency">Choose physical currency:</label>
        <select name="physicalCurrency"></select><br/> <br/>
        <label htmlFor="digitalCurrency">Choose digital currency:</label>
        <select name="digitalCurrency"></select>
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
            layout={{width: 800, height: 600, title: `Daily Time Series of ${symbol} (${market})`}}
          />
    </div>)
}

export default BitCoin;