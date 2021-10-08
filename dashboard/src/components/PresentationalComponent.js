import React from 'react';
import BitCoin from './BitCoin-container';
import Gold from './Gold-container';
import SnP500 from './SnP500-container';

class PresentationalComponent extends React.Component {
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

export default PresentationalComponent;