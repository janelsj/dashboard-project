import axios from 'axios';

const API = axios.create({
    baseURL: "https://alpha-vantage.p.rapidapi.com/query",
    headers: {
        'x-rapidapi-host': 'alpha-vantage.p.rapidapi.com',
        'x-rapidapi-key': '956f29f902mshec9c7d274d0cce0p1074e5jsnc6ab53dcf3ad' //Hansen key
      }
});

export default API;