import TruffleContract from 'truffle-contract';
import Web3 from 'web3';
import { BigNumber } from 'bignumber.js';

// contract dc
import ContractDC from '../../common/contract/ContractDC';

// model
const UserInitContract = TruffleContract(require('../../../build/contracts/UserInit.json'));
import UserInit from '../model/UserInit';

class UserContractDC {
  public EVENT_VALUESET = 'ValueSet';
  public EVENT_USERINSERT = 'UserInsert';

  instance: any;
  allEvents: any;
  userContractEventListener: (event: any) => void;

  setContractEventListener(listener: (args: Object) => void) {
    this.userContractEventListener = listener;
  }

  async deployUserInitContract() {
    const web3 = await ContractDC.getWeb3();
    UserInitContract.setProvider(web3.currentProvider);
    UserInitContract.deployed().then(instance => {
      this.allEvents = instance.allEvents({
        fromBlock: 0,
        toBlock: 'latest'
      })
      this.allEvents.watch((err, event) => {
        if (this.userContractEventListener) this.userContractEventListener(event);
        else console.error('contract event listner is undefined');
      });
      this.instance = instance;
    });
  }

  public stopWatch() {
    if (this.allEvents) this.allEvents.stopWatching();
    else console.error('event is undefined');
  }

  public async setValue() {
    const account = (await ContractDC.getAccounts())[0];
    this.instance.setValue(15, { from: account });
  }

  public async getValue() {
    return this.instance.getValue();
  }

  public async insertUser(userAddress: string, name: string, age: BigNumber, email: string) {
    const account = (await ContractDC.getAccounts())[0];
    this.instance.insertUser(userAddress, name, age, email, { from: account });
  }

}

export default new UserContractDC();
