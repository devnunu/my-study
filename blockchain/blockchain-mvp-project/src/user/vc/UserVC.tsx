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

  async userContractEvent(event) {
    console.log(event);
    if (event.event === UserContractDC.EVENT_LOGNEWUSER) {
      // const { web3 } = this.props;
      // const args = event['args'];
      // const user = new UserInfo(
      //   args.index.toNumber(),
      //   args.userAge.toNumber(),
      //   web3.utils.hexToAscii(args.userName),
      //   web3.utils.hexToAscii(args.userEmail),
      //   web3.utils.hexToAscii(args.userAddress),
      // );

      let { userList } = this.state;
      userList = await UserContractDC.getAllUsers();
      // userList.push(user);

      console.log('userLiuserList',userList);

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

  onClickGetUser() {
    UserContractDC.getAllUsers();
    // UserContractDC.getUser('0x6596D4C7208b96bf0def56B9f847614277912121');
  }

  render() {
    const { userList } = this.state;
    return (
      <div>
        <div onClick={this.onClickGetUser}>getuser getuser getuser</div>
        <UserRegisterView onClickUserRegister={this.onClickUserRegister.bind(this)} />
        {userList.length !== 0 ? <UserListView userList={userList} /> : null}
      </div>
    )
  }
}

export default UserVC;
