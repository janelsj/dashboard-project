import {useState, useEffect} from 'react';
import Graph from '../common_functions/graph';
import API from '../common_functions/api';
import DropdownListMaker from '../common_functions/dropdown-list-maker';
import moment from 'moment';

function Crypto(){

    const [graphValues, setGraphValues] = useState({
        xAxis: [],
        yAxis: [],
    });
    const [market, setMarket] = useState('USD,United States Dollar');
    const [symbol, setSymbol] = useState('BTC,Bitcoin');
    const [isAPILoaded, setIsAPILoaded] = useState(false);

    async function getCryptoData() {
        const cryptoData = await API.get('', {
            headers: {'x-rapidapi-key': 'a57be0c007msh6f8ae509f4788bap1cd588jsn08ecd04d7136'},
            params: {market: market.split(",")[0], symbol: symbol.split(",")[0], function: 'DIGITAL_CURRENCY_WEEKLY'}
        });
        return cryptoData;
    }

    useEffect(()=>{
        let xValuesArray = [];
        let yValuesArray = [];
        /* Get values for Graph from API*/
        getCryptoData().then(response => {
            if (response.data["Error Message"]) {
                setIsAPILoaded(false);
                alert("Invalid selection. Please select another cryptocurrency.");
                xValuesArray = [''];
                yValuesArray=[''];
                setGraphValues({xAxis: xValuesArray, yAxis: yValuesArray});
                setTimeout(()=>{document.querySelector("select[name='physicalCurrency']").focus()},1);
            } else {
                for (let eachDate in response.data['Time Series (Digital Currency Weekly)']){
                    // console.log(response.data['Time Series (Digital Currency Weekly)'][eachDate][`4a. close (${market.split(",")[0]})`]);
                    xValuesArray.push(eachDate);
                    yValuesArray.push(response.data['Time Series (Digital Currency Weekly)'][eachDate][`4a. close (${market.split(",")[0]})`]);
                }
                setGraphValues({xAxis: xValuesArray, yAxis: yValuesArray});
                setIsAPILoaded(true);
            }
        });
        
        return () => setIsAPILoaded(false);

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
            <h4>Latest Closing Price of {symbol.split(",")[0]} : {graphValues.yAxis[0]==='' ? ''
                    : parseFloat(graphValues.yAxis[0]).toFixed(2)} {market.split(",")[0]} <br/>
                Last Retrieved On : {moment(graphValues.xAxis[0]).format('Do MMMM YYYY')}</h4>
        </div>
        <Graph 
             x={graphValues.xAxis}
             y={graphValues.yAxis}
            color='blue'
            chartTitle={`Weekly Time Series of ${symbol.split(",")[1]} valuation (in ${market.split(",")[0]})`}
            isLoaded={isAPILoaded}
        />
    </>)
}

export default Crypto;