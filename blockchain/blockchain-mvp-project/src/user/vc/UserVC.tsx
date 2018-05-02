import React, { Component } from 'react';
import TruffleContract from 'truffle-contract';
import Web3 from 'web3'

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

  public async componentWillMount() {
    UserInitContract.setProvider(this.props.web3.currentProvider);
    console.log('this.props.web3.currentProvider', this.props.web3.currentProvider)
    console.log('UserInitContract', UserInitContract)
    await UserInitContract.deployed().then(instance => {
      console.log('instance', instance)
      instance.setValue(15, { from: '0x4f00D184C23b031f122b7D73d71aE1F8e9535227' })
      return instance
    }).then((instance => {
      return instance.getValue();
      // console.log("Value was set to", result.logs[0].args.val);
    })).then(result => {
      console.log(result.toNumber());
    });
  }

  onClickSubmit() {
    const { instance } = this.state;
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
