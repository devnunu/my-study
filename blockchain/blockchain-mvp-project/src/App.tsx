import React, { Component, Fragment } from 'react';
import Web3 from 'web3';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

// contract
import ContractDC from './common/contract/ContractDC';

// view
import TopNav from './common/view/nav/TopNav';
import SideNav from './common/view/nav/SideNav';
import NotFound from './common/view/notfound/NotFound';
import UserVC from './user/vc/UserVC';
import HomeVC from './home/vc/HomeVC';


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
      <BrowserRouter>
        <Fragment>
          <TopNav />
          <SideNav>
            <Switch>
              {web3 && (
                <Fragment>
                  <Route path='/home' render={() => <HomeVC web3={web3} account={account} />} />
                  <Route path='/user' render={() => <UserVC web3={web3} account={account} />} />
                </Fragment>
              )}
            </Switch>
          </SideNav>
        </Fragment>
      </BrowserRouter>
    );
  }
}

export default App;
