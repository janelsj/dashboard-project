import API from './API';
import  {useEffect} from 'react';

//  fetchGold() {
//     API.get( '/owner')
//     const API_KEY = '03Q1B3D0MEHUO0ZQ';
//     let API_Call = 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=GLD&outputsize=full&apikey=${API_KEY}';
// };

function Gold() {
    // const [posts, setPosts] = useState ([])

    useEffect (()=> {
        API.get('', {
            params: {
                interval: '5min',
                function: 'TIME_SERIES_INTRADAY',
                symbol: 'GLD',
                datatype: 'json',
                output_size: 'compact'
              },
          })
          .then(function (response)
          {
              console.log(response);
          })

    }, []);

    return(<>
        <div>
            <h1>Gold Price</h1>
    
        </div>
    </>)
}

export default Gold;