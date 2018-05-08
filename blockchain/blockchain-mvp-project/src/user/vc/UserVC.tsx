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
import UserDeleteView from '../view/UserDeleteView';

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
    UserContractDC.deployUserInitContract(this.onDeployContract.bind(this));
  }

  async onDeployContract() {
    let { userList } = this.state;
    userList = await UserContractDC.getAllUsers();

    console.log('userLiuserList', userList);

    this.setState({ ...this.state, userList })
  }

  async userContractEvent(event) {
    console.log(event);
    // if (event.event === UserContractDC.EVENT_LOGNEWUSER) {

    let { userList } = this.state;
    userList = await UserContractDC.getAllUsers();

    console.log('userLiuserList', userList);

    this.setState({ ...this.state, userList })
    // } else {
    //   console.error('unregistered event detected');
    // }
  }

  async onClickUserRegister(userInfo: UserInfo) {
    const { userAddress, name, age, email } = userInfo;
    await UserContractDC.insertUser(userAddress, name, age, email);
  }

  async onClickUserDelete(userAddress: string) {
    await UserContractDC.deleteUser(userAddress);
  }

  async onClickGetUser() {
    const allUsers = await UserContractDC.getAllUsers();
    console.log('allUsers', allUsers);
  }

  render() {
    const { userList } = this.state;
    return (
      <div>
        <div onClick={this.onClickGetUser}>getuser getuser getuser</div>
        <UserRegisterView onClickUserRegister={this.onClickUserRegister.bind(this)} />
        <UserDeleteView onClickUserDelete={this.onClickUserDelete.bind(this)} />
        {userList.length !== 0 ? <UserListView userList={userList} /> : null}
      </div>
    )
  }
}

export default UserVC;
