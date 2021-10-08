import {useState, useEffect} from 'react';
import API from './API';

function BitCoin(){

    let [dataArray, setDataArray] = useState([]);

    async function getBitCoinData() {
        return await API.get('', {
            params: {market: 'SGD', symbol: 'BTC', function: 'DIGITAL_CURRENCY_DAILY'}
        });
    }

    function refresh() {
        // let array = dataArray;
        getBitCoinData().then(response => {
            const datesObj = response.data['Time Series (Digital Currency Daily)'];
            let datesArray = [];
            Object.keys(datesObj).map(item => {
               return datesArray.push(item);
            });
            dataArray = datesArray.map(date => {
                return {[date]: response.data['Time Series (Digital Currency Daily)'][date]['4a. close (SGD)']}
            })
                // array.push({[this.eachDate]: response.data['Time Series (Digital Currency Daily)'][this.eachDate]['4a. close (SGD)']});
            // };
            console.log(dataArray);
            return setDataArray(dataArray);
        });
        // return setDataArray(dataArray);
    };

    useEffect(()=>{
        console.log("useEffect", dataArray);
        return () => console.log("exit", dataArray);
    },[dataArray]);

    // useEffect(()=>{
    //     (async() => {
    //         await API.get('', {
    //             params: {market: 'SGD', symbol: 'BTC', function: 'DIGITAL_CURRENCY_DAILY'}
    //         }).then(response => {
    //             let array = dataArray;
    //             for (eachDate in response.data['Time Series (Digital Currency Daily)']){
    //                 array.push({[eachDate]: response.data['Time Series (Digital Currency Daily)'][eachDate]['4a. close (SGD)']});
    //              };
    //             setDataArray(array);
    //         });
    //     })()
    //     return () => {
    //         console.log(dataArray);
    //     };
    // }, [dataArray]);

    return(<div id="bitcoin">
        Content for BitCoin <br/>
        <button onClick={refresh}>Refresh</button>
        <div id="bitcoinText">{JSON.stringify(dataArray)}</div>
    </div>)
}

export default BitCoin;