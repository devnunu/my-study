import React, { Component } from 'react';
import TruffleContract from 'truffle-contract';
import Web3 from 'web3';

// contract DC
import ContractDC from '../../common/contract/ContractDC';
import UserContractDC from '../dc/UserContractDC';

// model
const UserInitContract = TruffleContract(require('../../../build/contracts/UserInit.json'));
import UserInit, { User } from '../model/UserInit';

// styles
import styles from './UserVC.scss';


interface UserVCProps {
  web3: Web3;
  account: string;
}

interface UserVCState {
  instance: UserInit;
  userList: number[];
}

class UserVC extends Component<UserVCProps, UserVCState>{
  Events: any
  private EVENT_VALUESET = 'ValueSet';
  state = {
    ...this.state,
    instance: undefined,
  }

  componentWillMount() {
    UserContractDC.deployUserInitContract();
  }

  // deployUserInitContract() {
  //   UserInitContract.setProvider(this.props.web3.currentProvider);
  //   UserInitContract.deployed().then(instance => {
  //     const allEvents = instance.allEvents({
  //       fromBlock: 0,
  //       toBlock: 'latest'
  //     })
  //     allEvents.watch((err, res) => {
  //       this.addUserToUserList(res);
  //       // console.log(err, res);
  //     });
  //     this.setState({ ...this.state, instance });
  //   });
  // }

  // addUserToUserList(event) {
  //   if (ContractDC.validationEvent(event, this.EVENT_VALUESET)) {
  //     const val = event['args'].val
  //     console.log(val.toNumber());
  //   }
  // }

  // setValue() {
  //   const { account } = this.props;
  //   const { instance } = this.state;
  //   return instance.setValue(15, { from: account });
  // }

  // getValue() {
  //   const { account } = this.props;
  //   const { instance } = this.state;
  //   return instance.getValue();
  // }

  async onClickSubmit() {
    UserContractDC.setValue();
  }

  async onClickGetValue() {
    UserContractDC.getValue();
  }

  render() {
    return (
      <div>
        <div>hello world!</div>
        <div className={styles.getValueButton} onClick={this.onClickGetValue.bind(this)}>getValue</div>
        <div className={styles.setValueButton} onClick={this.onClickSubmit.bind(this)}>submit</div>
      </div>
    )
  }
}

export default UserVC;
