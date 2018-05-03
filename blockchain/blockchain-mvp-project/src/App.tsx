import React, { Component } from 'react';
import Web3 from 'web3';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

// contract
import ContractDC from './common/contract/ContractDC';

// view
import UserVC from './user/vc/UserVC';
import TopNav from './common/view/nav/TopNav';
import SideNav from './common/view/nav/SideNav';

// styles
import styles from './App.scss';
import './assets/style.scss';

interface AppState {
  web3: Web3;
  account: string;
}

class App extends Component<{}, AppState> {

  state = {
    web3: null,
    account: undefined,
  }

  public async componentWillMount() {
    const web3 = ContractDC.getWeb3();
    const accounts = await ContractDC.getAccounts();
    this.setState({ web3, account: accounts[0] });
  }

  render() {
    const { web3, account } = this.state;
    return (
      <div>
        <BrowserRouter>
          <div>
          <TopNav />
          {/* {web3 ? (
                    <div>
                        <p>
                            Provider is MetaMask: {(web3.currentProvider as any).isMetaMask ? 'yes' : 'no'}
                        </p>
                        <p>
                            Provider is Mist: {(window as any).mist ? 'yes' : 'no'}
                        </p>
                        {(web3.currentProvider as any).host ?
                            <p>Provider is {(web3.currentProvider as any).host}</p> : null}
                    </div>
                ) :
                    <p>Web3 is loading</p>} */}
          <SideNav>
            <Switch>
              {web3 && (<Route path='/' render={() => <UserVC web3={web3} account={account} />} />)}
            </Switch>
          </SideNav>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
