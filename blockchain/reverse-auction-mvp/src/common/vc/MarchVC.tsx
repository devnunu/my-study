import React, { Component } from 'react';
import Web3 from 'web3';
import TruffleContract from 'truffle-contract';

export interface MarchVCProps {
  web3: Web3;
  account: string;
}

export interface MarchVCState {
  instance: any;
}

class MarchVC<PROPS extends MarchVCProps, STATE> extends Component<PROPS, STATE & MarchVCState> {
  constructor(props, _contract: any) {
    super(props);
    _contract.setProvider(this.props.web3.currentProvider);
    _contract.deployed().then(this.attachEvent.bind(this));
  }

  attachEvent(instance) {
    const allEvents = instance.allEvents({
      fromBlock: 'latest',
      toBlock: 'latest'
    });
    allEvents.watch((err, event) => {
      this.eventListener(event);
    });
    this.setState({ instance })
  }

  // have to override
  eventListener(event) {
    console.log(event);
  }
}

export default MarchVC;