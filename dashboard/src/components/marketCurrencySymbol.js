import { generateJsonFileFromCsv } from 'convert-csv-to-json/src/index';

const fileInputName1 = '../data/digital_currency_list.csv'; 
const fileOutputName1 = '../data/digital_currency_list.json';

const fileInputName2 = '../data/physical_currency_list.csv'; 
const fileOutputName2 = '../data/physical_currency_list.json';

generateJsonFileFromCsv(fileInputName1,fileOutputName1);
generateJsonFileFromCsv(fileInputName2,fileOutputName2);