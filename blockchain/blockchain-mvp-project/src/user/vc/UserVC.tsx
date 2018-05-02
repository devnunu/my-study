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
    UserInitContract.setProvider(this.props.web3.currentProvider);
  }

  setValue() {
    this.props.web3.eth.getAccounts(function (err, accounts) {
      if (err != null) {
        console.error("There was an error fetching your accounts.");
        return;
      }
      if (accounts.length == 0) {
        console.error("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
        return;
      }

      const account = accounts[0];
      UserInitContract.deployed().then(instance => {
        return instance.setValue(15, { from: account })
      }).then((result => {
        console.log(result);
      }));
    })

  }

  onClickSubmit() {
    const { instance } = this.state;
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
