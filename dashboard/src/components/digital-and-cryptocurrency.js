import {useState, useEffect} from 'react';
import Graph from '../common_functions/graph';
import API from '../common_functions/api';
import DropdownListMaker from '../common_functions/dropdown-list-maker';

function Crypto(){

    const [graphValues, setGraphValues] = useState({
        xAxis: [],
        yAxis: [],
    });
    const [market, setMarket] = useState('USD,United States Dollar');
    const [symbol, setSymbol] = useState('BTC,Bitcoin');

    async function getCryptoData() {
        return await API.get('', {
            headers: {'x-rapidapi-key': '2cc4f9fb5fmsh6c7c17f151bdaa1p1f3fb7jsne9ae56177c97'},
            params: {market: market.split(",")[0], symbol: symbol.split(",")[0], function: 'DIGITAL_CURRENCY_WEEKLY'}
        });
    }

    useEffect(()=>{
    /* Get values for Graph from API*/
        let xValuesArray = [];
        let yValuesArray = [];
        getCryptoData().then(response => {
            if (response.data["Error Message"]) {
                alert("Invalid selection. Please select another cryptocurrency.")
            } else {
                for (let eachDate in response.data['Time Series (Digital Currency Weekly)']){
                    // console.log(response.data['Time Series (Digital Currency Weekly)'][eachDate][`4a. close (${market.split(",")[0]})`]);
                    xValuesArray.push(eachDate);
                    yValuesArray.push(response.data['Time Series (Digital Currency Weekly)'][eachDate][`4a. close (${market.split(",")[0]})`]);
                }
                setGraphValues({xAxis: xValuesArray, yAxis: yValuesArray});
                // console.log("getting crypto data");
            }
        });
        
        return () => console.log("exit Crypto");

    },[market, symbol]);
    
    return(<>
        <div className="div-header">
            <h2>{'Digital & Crypto Currency'}</h2>
            <div className="selection">
                <label htmlFor="physicalCurrency">Choose physical currency:</label>
                <select name="physicalCurrency" value={market} onChange={e => setMarket(e.target.options[e.target.selectedIndex].value)}>
                    <DropdownListMaker filePathName='physical'/>
                </select>
                <label htmlFor="digitalCurrency">Choose digital currency:</label>
                <select name="digitalCurrency" value={symbol} onChange={e => setSymbol(e.target.options[e.target.selectedIndex].value)}>
                    <DropdownListMaker filePathName='digital'/>
                </select> 
            </div>
            <h4>Latest Closing Price of {symbol.split(",")[0]} : {parseFloat(graphValues.yAxis[0]).toFixed(2)} {market.split(",")[0]} <br/> Last Retrieved On : {graphValues.xAxis[0]}</h4>
        </div>
        <Graph 
             x={graphValues.xAxis}
             y={graphValues.yAxis}
            color={'blue'}
            chartTitle={`Weekly Time Series of ${symbol.split(",")[1]} valuation (in ${market.split(",")[1]})`}
        />
    </>)
}

export default Crypto;