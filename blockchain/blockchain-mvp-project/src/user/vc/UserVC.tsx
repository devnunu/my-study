import React, { Component } from 'react';
import TruffleContract from 'truffle-contract';
import Web3 from 'web3';

// contract DC
import ContractDC from '../../common/contract/ContractDC';
import UserContractDC from '../dc/UserContractDC';

// model
const UserInitContract = TruffleContract(require('../../../build/contracts/UserInit.json'));
import UserInit, { UserInfo } from '../model/UserInit';

// view
import UserRegisterView from '../view/UserRegisterView';
import UserListView from '../view/UserListView';

// styles
import styles from './UserVC.scss';


interface UserVCProps {
  web3: Web3;
  account: string;
}

interface UserVCState {
  instance: UserInit;
  userList: UserInfo[];
}

class UserVC extends Component<UserVCProps, UserVCState>{
  Events: any
  private EVENT_VALUESET = 'ValueSet';
  state = {
    ...this.state,
    instance: undefined,
    userList: [],
  }

  componentWillMount() {
    UserContractDC.setContractEventListener(this.userContractEvent.bind(this));
    UserContractDC.deployUserInitContract();
  }

  userContractEvent(event) {
    console.log(event);
    if (event.event === UserContractDC.EVENT_USERINSERT) {
      const args: UserInfo = event['args'];
      const user = new UserInfo(
        args.userAddress,
        args.name,
        args.age,
        args.email,
      )
      const { userList } = this.state;
      userList.push(user);
      console.log(userList);
      this.setState({ ...this.state, userList })
    } else {
      console.error('unregistered event detected');
    }
  }

  onClickUserRegister(userInfo: UserInfo) {
    console.log('client user data', userInfo);
    const { userAddress, name, age, email } = userInfo;
    UserContractDC.insertUser(userAddress, name, age, email)
  }

  render() {
    const { userList } = this.state;
    return (
      <div>
        <div>hello world!</div>
        {userList.length !== 0 ? <UserListView userList={userList} /> : null}
        <UserRegisterView onClickUserRegister={this.onClickUserRegister.bind(this)} />
      </div>
    )
  }
}

export default UserVC;
