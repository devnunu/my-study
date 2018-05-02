
import Web3 from 'web3';

class ContractDC {
  web3: Web3;
  account: string;

  accountListener: (account: string) => void;

  getWeb3() {
    let web3: Web3 = (window as any).web3 as Web3;

    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    if (typeof web3 !== 'undefined') {
      console.log('Using injected web3 provider');
      web3 = new Web3(web3.currentProvider);
    } else {
      // Fallback to localhost if no web3 injection.
      console.log('No web3 instance injected, using Local web3.');
      const provider = new Web3.providers.HttpProvider('http://localhost:7545');
      web3 = new Web3(provider);
    }
    this.web3 = web3;
    return web3;
  }

  fetchAccount(accountId: number = 0) {
    this.web3.eth.getAccounts(function (err, accounts) {
      if (err != null) {
        console.error("There was an error fetching your accounts.");
        return;
      }
      if (accounts.length == 0) {
        console.error("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
        return;
      }
      if (this.account === undefined) {
        this.account = accounts[accountId];
      }
      this._callAccountFetched();
    })
  }

  public setAccountListener(listener: (account: string) => void) {
    this.accountListener = listener;
  }
  _callAccountFetched() {
    if (this.account === undefined) return;
    if (this.accountListener) this.accountListener(this.account);
  }
}

export default new ContractDC();
