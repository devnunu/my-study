import React, { Component } from 'react';
import TruffleContract from 'truffle-contract';
import Web3 from 'web3';

// contract
import ContractDC from '../../common/contract/ContractDC';

// model
const UserInitContract = TruffleContract(require('../../../build/contracts/UserInit.json'));
import UserInit, { User } from '../model/UserInit';


interface UserVCProps {
  web3: Web3;
  account: string;
}

interface UserVCState {
  instance: UserInit;
}

class UserVC extends Component<UserVCProps, UserVCState>{
  Events: any
  state = {
    instance: undefined,
  }

  componentWillMount() {
    this.deployUserInitContract();
  }

  deployUserInitContract() {
    UserInitContract.setProvider(this.props.web3.currentProvider);
    UserInitContract.deployed().then(instance => {
      this.setState({ ...this.state, instance });
    });
  }

  setValue() {
    const { account } = this.props;
    const { instance } = this.state;
    instance.setValue(15, { from: account }).then((result => {
      console.log(result);
    }));
  }

  onClickSubmit() {

    this.setValue();
  }

  render() {
    return (
      <div>
        hello world!
        <button onClick={this.onClickSubmit.bind(this)}>submit</button>
      </div>
    )
  }
}

export default UserVC;
