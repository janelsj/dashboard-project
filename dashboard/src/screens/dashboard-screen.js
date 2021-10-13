import React from 'react';
import Gold from '../components/gold';
import SnP500 from '../components/s-and-p-500';
import Crypto from '../components/digital-and-cryptocurrency';
import Forex from '../components/forex';

class DashboardScreen extends React.Component {
    constructor(){
        super();
    }

    render() {
        return(<div id="parent">
            <div id="gold"><Gold/></div>
            <div id="snp500"><SnP500/></div>
            <div id="crypto"><Crypto/></div>
            <div id="forex"><Forex/></div>
        </div>)
    }

}

export default DashboardScreen;