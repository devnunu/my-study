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
  public EVENT_USERINSERT = 'UserInsert';

  web3: Web3;
  account: string;

  instance: any;
  allEvents: any;
  userContractEventListener: (event: any) => void;

  setContractEventListener(listener: (args: Object) => void) {
    this.userContractEventListener = listener;
  }

  async deployUserInitContract() {
    this.web3 = await ContractDC.getWeb3();
    this.account = this.web3.eth.accounts[0];
    UserInitContract.setProvider(this.web3.currentProvider);
    UserInitContract.deployed().then(this.attachEvent.bind(this));
  }

  attachEvent(instance) {
    this.allEvents = instance.allEvents({
      fromBlock: 0,
      toBlock: 'latest'
    })
    this.allEvents.watch((err, event) => {
      if (this.userContractEventListener) this.userContractEventListener(event);
      else console.error('contract event listner is undefined');
    });
    this.instance = instance;
  }

  public stopWatch() {
    if (this.allEvents) this.allEvents.stopWatching();
    else console.error('event is undefined');
  }

  public async insertUser(userAddress: string, name: string, age: BigNumber, email: string) {
    const account = (await ContractDC.getAccounts())[0];
    this.instance.insertUser(userAddress, name, age, email, { from: account });
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
}

export default new UserContractDC();
