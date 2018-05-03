import TruffleContract from 'truffle-contract';
import Web3 from 'web3';

// contract dc
import ContractDC from '../../common/contract/ContractDC';

// model
const UserInitContract = TruffleContract(require('../../../build/contracts/UserInit.json'));
import UserInit, { User } from '../model/UserInit';

class UserContractDC {
  private EVENT_VALUESET = 'ValueSet';

  instance: any;

  async deployUserInitContract() {
    const web3 = await ContractDC.getWeb3();
    UserInitContract.setProvider(web3.currentProvider);
    UserInitContract.deployed().then(instance => {
      const allEvents = instance.allEvents({
        fromBlock: 0,
        toBlock: 'latest'
      })
      allEvents.watch((err, res) => {
        this.addUserToUserList(res);
      });
      this.instance = instance;
    });
  }

  addUserToUserList(event) {
    if (ContractDC.validationEvent(event, this.EVENT_VALUESET)) {
      const val = event['args'].val
      console.log(val.toNumber());
    }
  }

  public async setValue() {
    const account = (await ContractDC.getAccounts())[0];
    this.instance.setValue(15, { from: account });
  }

  public async getValue() {
    const account = (await ContractDC.getAccounts())[0];
    return this.instance.getValue();
  }

}

export default new UserContractDC();
