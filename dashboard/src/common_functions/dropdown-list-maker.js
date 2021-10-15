import {useState, useEffect} from 'react';
import Papa from 'papaparse';
import { nanoid } from 'nanoid';

function DropdownListMaker({filePathName}) {

    const[list, setList] = useState([]);

    useEffect(()=>{

        let array =[];  

        /*Papaparse API Library used to get values from csv files for the dropdown lists */
        Papa.parse(`/dashboard-project/data/${filePathName}_currency_list.csv`, {
        download: true,
        header: true,
        step: (result) => array.push(result.data),
        complete: (results) => {
            results.data = array;
            setList(results.data);
            }
        });

        return () => setList([]);
    }, [])
    
    return(<>
        <option key={nanoid()} value="">Select currency</option>
        {list.map(item => {
            return <option key={nanoid()} value={`${item['currency code']},${item['currency name']}`}>{`${item['currency code']} (${item['currency name']})`}</option>
        })}
    </>)
}

export default DropdownListMaker;