import React, {useState, useEffect} from 'react';
import Plot from 'react-plotly.js';
import API from './API';
// import { getJsonFromCsv } from 'convert-csv-to-json/src/index';

function BitCoin(){

    // const digitalCurrInput = '../data/digital_currency_list.csv'; 
    // const digitalCurrOutput = '../data/digital_currency_list.json';

    // const physicalCurrInput = '../data/physical_currency_list.csv'; 
    // const physicalCurrOutput = '../data/physical_currency_list.json';

    // generateJsonFileFromCsv(digitalCurrInput, digitalCurrOutput);
    // generateJsonFileFromCsv(physicalCurrInput, physicalCurrOutput);
    let physicalCurrArray = [];
    // let json = getJsonFromCsv("../data/physical_currency_list.csv");
    //     for(let i=0; i<json.length;i++) {
    //         console.log(json[i]);
    //     }

    const [xAxis, setXAxis] = useState([]);
    const [yAxis, setYAxis] = useState([]);
    const [market, setMarket] = useState('SGD');
    const [symbol, setSymbol] = useState('BTC');

    async function getBitCoinData() {
        return await API.get('', {
            params: {market, symbol, function: 'DIGITAL_CURRENCY_DAILY', outputsize: 'compact'}
        });
    }

    function selection(selectElementName, arrayList) {
        let option = document.createElement("option");
        option.value = "";
        option.text = "Select currency";
        selectElementName.append(option);
        arrayList.forEach((item) => {
            option = document.createElement("option");
            option.value = item;
            option.text = item;
            selectElementName.append(option);
        })
    }

    function getValue(dropDownList) {
        return dropDownList.options[dropDownList.selectedIndex].value;
    };

    useEffect(()=>{
        // selection(document.querySelector('select[name="physicalCurrency"]'), physicalCurrOutput);
        // selection(document.querySelector('select[name="digitalCurrency"]'), digitalCurrOutput);
        let xValuesArray = [];
        let yValuesArray = [];
        getBitCoinData().then(response => {
            for (let eachDate in response.data['Time Series (Digital Currency Daily)']){
                console.log(response.data['Time Series (Digital Currency Daily)'][eachDate]['4a. close (SGD)']);
                xValuesArray.push(eachDate);
                yValuesArray.push(response.data['Time Series (Digital Currency Daily)'][eachDate]['4a. close (SGD)'])
            }
            setXAxis(xValuesArray);
            setYAxis(yValuesArray);
        });

            
            
            // const datesObj = response.data['Time Series (Digital Currency Daily)'];
            // let datesArray = xAxis;
            // Object.keys(datesObj).map(item => {
            //    return datesArray.push(item);
            // });
            // array = datesArray.forEach(date => {
            //     const trace1 = {
            //         x: [...date],
            //         y: [...response.data['Time Series (Digital Currency Daily)'][date]['4a. close (SGD)']],
            //         mode: 'lines+markers',
            //         name: `${response.data['Meta Data']['2. Digital Currency Code']}`+'/'+`${response.data['Meta Data']['4. Market Code']}`,
            //       };
                  
            //     const data = [trace1];
                  
            //     const layout = {
            //         title: `${response.data['Meta Data']['1. Information']}`+" "+`${response.data['Meta Data']['3. Digital Currency Name']}`+"/"+`${response.data['Meta Data']['5. Market Name']}`,
            //         xaxis: {
            //           title: 'Time'
            //         },
            //         yaxis: {
            //           title: 'SGD'
            //         }
            //       };
                  
            //     Plotly.newPlot('bitcoinGraph', data, layout);



        //     array = datesArray.map(date => {
        //         // setXAxis(date);
        //         // setYAxis(.response.data['Time Series (Digital Currency Daily)'][date]['4a. close (SGD)']);
        //         return {[date]: response.data['Time Series (Digital Currency Daily)'][date]['4a. close (SGD)']}
        //     })
        //     setXAxis(datesArray);
        //     for (let i=0; i<array.length; i++){
        //         setYAxis(array[i][date])
        //     }
        //     console.log(xAxis, yAxis);
        //     // return setDataArray(array);
        // });
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
                marker: {color: 'red'},
              },
            ]}
            layout={{width: 800, height: 600, title: `Time Series of ${symbol} (${market})`}}
          />
    </div>)
}

export default BitCoin;