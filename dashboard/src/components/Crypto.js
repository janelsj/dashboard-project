import {useState, useEffect} from 'react';
import Graph from '../common_functions/Graph';
import API from '../common_functions/API';
import DropdownListMaker from '../common_functions/DropdownListMaker';

function Crypto(){

    const [xAxis, setXAxis] = useState([]);
    const [yAxis, setYAxis] = useState([]);
    const [market, setMarket] = useState('SGD,Singapore Dollar');
    const [symbol, setSymbol] = useState('BTC,Bitcoin');

    async function getCryptoData() {
        return await API.get('', {
            params: {market: market.split(",")[0], symbol: symbol.split(",")[0], function: 'DIGITAL_CURRENCY_DAILY'}
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
                for (let eachDate in response.data['Time Series (Digital Currency Daily)']){
                    // console.log(response.data['Time Series (Digital Currency Daily)'][eachDate][`4a. close (${market.split(",")[0]})`]);
                    xValuesArray.push(eachDate);
                    yValuesArray.push(response.data['Time Series (Digital Currency Daily)'][eachDate][`4a. close (${market.split(",")[0]})`]);
                }
                setXAxis(xValuesArray);
                setYAxis(yValuesArray);
            }
        });

        return () => console.log("exit Crypto");

    },[market, symbol]);
    
    return(<div id="crypto">
        <h2>{'Digital & Crypto Currency'}</h2>
        <div className="selection">
            <label htmlFor="physicalCurrency">Choose physical currency:</label>
            <select name="physicalCurrency" onChange={e => setMarket(e.target.options[e.target.selectedIndex].value)}>
                <DropdownListMaker filePathName='physical'/>
            </select>
            <label htmlFor="digitalCurrency">Choose digital currency:</label>
            <select name="digitalCurrency" onChange={e => setSymbol(e.target.options[e.target.selectedIndex].value)}>
                <DropdownListMaker filePathName='digital'/>
            </select> 
        </div>
        <Graph 
            x={xAxis}
            y={yAxis}
            color={'blue'}
            chartTitle={`Daily Time Series of ${symbol.split(",")[1]} valuation (in ${market.split(",")[1]})`}
        />
    </div>)
}

export default Crypto;