import React from 'react';
import BitCoin from '../components/BitCoin';
import Gold from '../components/Gold';
import SnP500 from '../components/SnP500';

class DashboardScreen extends React.Component {
    constructor(){
        super();
    }

    render() {
        return(<div id="parent">
            <div id="gold"><Gold/></div>
            <div id="snp500"><SnP500/></div>
            <div id="bitcoin"><BitCoin/></div>
        </div>)
    }

}

export default DashboardScreen;