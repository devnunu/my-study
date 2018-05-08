import TruffleContract from 'truffle-contract';
import Web3 from 'web3';
import { BigNumber } from 'bignumber.js';

// contract dc
import ContractDC from '../../common/contract/ContractDC';

// model
const UserInitContract = TruffleContract(require('../../../build/contracts/UserInit.json'));
import UserInit, { UserInfo } from '../model/UserInit';

class UserContractDC {
  public EVENT_VALUESET = 'ValueSet';
  public EVENT_LOGNEWUSER = 'LogNewUser';

  web3: Web3;
  account: string;

  instance: any;
  allEvents: any;
  userContractEventListener: (event: any) => void;

  setContractEventListener(listener: (args: Object) => void) {
    this.userContractEventListener = listener;
  }

  async deployUserInitContract(callback) {
    this.web3 = await ContractDC.getWeb3();
    this.account = (await ContractDC.getAccounts())[0];
    UserInitContract.setProvider(this.web3.currentProvider);
    UserInitContract.deployed().then(this.attachEvent.bind(this)).then(callback);
  }

  attachEvent(instance) {
    this.instance = instance;
    this.allEvents = instance.allEvents({
      fromBlock: 'latest',
      toBlock: 'latest'
    })
    this.allEvents.watch((err, event) => {
      if (this.userContractEventListener) this.userContractEventListener(event);
      else console.error('contract event listner is undefined');
    });
  }

  public stopWatch() {
    if (this.allEvents) this.allEvents.stopWatching();
    else console.error('event is undefined');
  }

  public async insertUser(userAddress: string, name: string, age: number, email: string) {
    const result = await this.instance.insertUser(userAddress, name, age, email, { from: this.account });
    return result;
  }

  public async getUser(userAddress: string) {
    let [userName, userEmail, userAge, index] = await this.instance.getUser(userAddress, { from: this.account });
    index = index.toNumber();
    userAge = userAge.toNumber();
    userName = this.web3.utils.hexToAscii(userName);
    userEmail = this.web3.utils.hexToAscii(userEmail);

    const newUser = new UserInfo(index, userAge, userName, userEmail);
    console.log('getUser result:', newUser);
    return newUser;
  }

  public async deleteUser(userAddress: string) {
    const reuslt = await this.instance.deleteUser(userAddress, { from: this.account })
    console.log('delete result', reuslt);
  }

  public async getAllUsers() {
    const result = await this.instance.getAllUsers();
    console.log(result, 'result');
    const [userNames, userEmails, userAges, indexes, resultAddress] = result;
    const userList: UserInfo[] = [];
    for (let i = 0; i < userNames.length; i++) {
      const newUser = new UserInfo();
      newUser.index = indexes[i].toNumber();
      newUser.age = userAges[i].toNumber();
      newUser.name = this.web3.utils.hexToAscii(userNames[i]);
      newUser.email = this.web3.utils.hexToAscii(userEmails[i]);
      newUser.userAddress = resultAddress[i];
      userList.push(newUser);
    }
    return userList;
  }
}

export default new UserContractDC();
