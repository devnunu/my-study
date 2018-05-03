
import Web3 from 'web3';

class ContractDC {

  static EVENT_PROPERTY = 'event';

  private web3: Web3;
  private accounts: string[];

  public getWeb3() {
    // web3가 없을 경우 다시 가져옴
    if (!this.web3) this.web3 = this.fetchWeb3();
    console.log('this.web3',this.web3)
    return this.web3;
  }

  public async getAccounts() {
    // accounts가 없을 경우 다시 가져옴
    if (!this.accounts) this.accounts = await this.fetchAccount();
    return this.accounts;
  }

  fetchWeb3() {
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
    console.log('web3',this.web3)
    return web3;
  }

  fetchAccount(accountId: number = 0) {
    return this.web3.eth.getAccounts((err, accounts) => {
      if (err != null) return console.error("There was an error fetching your accounts.");
      if (accounts.length == 0) return console.error("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
      return accounts;
    })
  }

  public validationEvent(event: any, eventName: string) {
    return event.event === eventName;
  }
}

export default new ContractDC();
