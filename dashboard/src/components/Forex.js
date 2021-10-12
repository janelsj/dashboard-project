import {useState, useEffect} from 'react';
import Graph from '../common_functions/Graph';
import API from '../common_functions/API';
import DropdownListMaker from '../common_functions/DropdownListMaker';

function Forex(){

    const [graphValues, setGraphValues] = useState({
        xAxis: [],
        yAxis: [],
    });
    const [fromSymbol, setFromSymbol] = useState('USD,United States Dollar');
    const [toSymbol, setToSymbol] = useState('SGD,Singapore Dollar');

    async function getForexData() {
        return await API.get('', {
            params: {from_symbol: fromSymbol.split(",")[0], to_symbol: toSymbol.split(",")[0], function: 'FX_DAILY', outputsize: 'compact'}
        });
    }

    useEffect(()=>{
    /* Get values for Graph from API*/
        let xValuesArray = [];
        let yValuesArray = [];
        getForexData().then(response => {
            for (let eachDate in response.data['Time Series FX (Daily)']){
                // console.log(response.data['Time Series FX (Daily)'][eachDate]['4. close']);
                xValuesArray.push(eachDate);
                yValuesArray.push(response.data['Time Series FX (Daily)'][eachDate]['4. close']);
            }
            setGraphValues({xAxis: xValuesArray, yAxis: yValuesArray});
        });

        return () => console.log("exit Forex");

    },[fromSymbol, toSymbol]);
    
    return(<div id="forex">
        <h2>{'Forex: Currency Exchange Rates'}</h2>
        <div className="selection">
            <label htmlFor="fromCurrency">From:</label>
            <select name="fromCurrency" value={fromSymbol} onChange={e => setFromSymbol(e.target.options[e.target.selectedIndex].value)}>
                <DropdownListMaker filePathName='physical'/>
            </select>
            <label htmlFor="toCurrency">To:</label>
            <select name="toCurrency" value={toSymbol} onChange={e => setToSymbol(e.target.options[e.target.selectedIndex].value)}>
                <DropdownListMaker filePathName='physical'/>
            </select> 
        </div>
        <Graph 
            x={graphValues.xAxis}
            y={graphValues.yAxis}
            color={'royalBlue'}
            chartTitle={`Forex Daily Prices of ${fromSymbol.split(",")[1]} (in ${toSymbol.split(",")[1]})`}
        />
    </div>)
}

export default Forex;