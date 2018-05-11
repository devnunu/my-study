import React, { Component } from 'react';
import Web3 from 'web3';
import TruffleContract from 'truffle-contract';

const TestContract = TruffleContract(require('../../../build/contracts/Test.json'));

// util
import getWeb3 from '../../common/util/getWeb3';

// view
import MarchVC, { MarchVCProps, MarchVCState } from '../../common/vc/MarchVC';

class HomeVC extends MarchVC<MarchVCProps, MarchVCState>{

  constructor(props) {
    super(props, TestContract);
  }

  async onClickSetButton() {
    const result = await this.state.instance.setValue(2, { from: this.props.account });
    console.log('set result', result);
  }

  async onClickGetButton() {
    const result = await this.state.instance.getValue();
    console.log('get result', result.toNumber());
  }

  render() {
    return (
      <div>
        Hello world!
        <div onClick={this.onClickSetButton.bind(this)}>set button</div>
        <div onClick={this.onClickGetButton.bind(this)}>get button</div>
      </div>
    )
  }
}

export default HomeVC;
