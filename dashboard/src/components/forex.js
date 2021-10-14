import {useState, useEffect} from 'react';
import Graph from '../common_functions/graph';
import API from '../common_functions/api';
import DropdownListMaker from '../common_functions/dropdown-list-maker';
import moment from 'moment';

function Forex(){

    const [graphValues, setGraphValues] = useState({
        xAxis: [],
        yAxis: [],
    });
    const [fromSymbol, setFromSymbol] = useState('USD,United States Dollar');
    const [toSymbol, setToSymbol] = useState('SGD,Singapore Dollar');
    const [isAPILoaded, setIsAPILoaded] = useState(false);

    async function getForexData() {
        const forexData = await API.get('', {
            headers: {'x-rapidapi-key': '2cc4f9fb5fmsh6c7c17f151bdaa1p1f3fb7jsne9ae56177c97'},
            params: {from_symbol: fromSymbol.split(",")[0], to_symbol: toSymbol.split(",")[0], function: 'FX_WEEKLY'}
        });
        return forexData;
    }

    useEffect(()=>{
    /* Get values for Graph from API*/
        let xValuesArray = [];
        let yValuesArray = [];
        if (toSymbol===fromSymbol) {
            alert ('Invalid selection. Please choose another currency pair.');
        } else {
            getForexData().then(response => {
                for (let eachDate in response.data['Time Series FX (Weekly)']){
                    if (moment(eachDate).isSameOrAfter('2019-W01-1')){
                        // console.log(response.data['Time Series FX (Weekly)'][eachDate]['4. close']);
                        xValuesArray.push(eachDate);
                        yValuesArray.push(response.data['Time Series FX (Weekly)'][eachDate]['4. close']);
                    }
                }
                setGraphValues({xAxis: xValuesArray, yAxis: yValuesArray});
                setIsAPILoaded(true);
            });
        }
        return () => console.log("exit Forex");

    },[fromSymbol, toSymbol]);
    
    return(<>
        <div className="div-header">
            <h2>Forex: Currency Exchange Rates</h2>
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
            <h4>Latest Closing Price : {parseFloat(graphValues.yAxis[0]).toFixed(3)} ({fromSymbol.split(",")[0]} / {toSymbol.split(",")[0]}) <br/> Last Retrieved On : {moment(graphValues.xAxis[0]).format('Do MMMM YYYY')}</h4>
        </div>
        <Graph 
            x={graphValues.xAxis}
            y={graphValues.yAxis}
            color='red'
            chartTitle={`Forex Weekly Prices of ${fromSymbol.split(",")[1]} (in ${toSymbol.split(",")[0]})`}
            isLoaded={isAPILoaded}
        />
    </>)
}

export default Forex;