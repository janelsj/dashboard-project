import axios from 'axios';

const API = axios.create({
    baseURL: "https://alpha-vantage.p.rapidapi.com/query",
    headers: {'x-rapidapi-host': 'alpha-vantage.p.rapidapi.com'}
});

export default API;