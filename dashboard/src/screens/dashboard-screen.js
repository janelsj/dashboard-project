import React from 'react';
import Gold from '../components/Gold';
import SnP500 from '../components/SnP500';
import Crypto from '../components/Crypto';
import Forex from '../components/Forex';

class DashboardScreen extends React.Component {
    constructor(){
        super();
    }

    render() {
        return(<div id="parent">
            <div id="gold"><Gold/></div>
            <div id="snp500"><SnP500/></div>
            <Crypto/>
            <Forex/>
        </div>)
    }

}

export default DashboardScreen;