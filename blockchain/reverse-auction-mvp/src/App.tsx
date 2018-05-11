import React, { Component } from 'react';
import Web3 from 'web3';

// util
import getWeb3 from './common/util/getWeb3';

// home
import HomeVC from './home/vc/HomeVC';

interface AppState {
  web3: Web3;
  account: string;
}

class App extends Component<{}, AppState>{
  state = {
    web3: undefined,
    account: undefined,
  }

  componentWillMount() {
    const web3 = getWeb3();
    web3.eth.getAccounts((err, accounts) => {
      const account = accounts[0]
      console.log('web3', web3)
      console.log('account', account)
      this.setState({ account, web3 });
    });
  }

  render() {
    const { web3 } = this.state;
    return (
      <div>
        {web3 && <HomeVC web3={this.state.web3} account={this.state.account} />}
      </div>
    )
  }
}

export default App;
