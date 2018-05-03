import React, { Component } from 'react';
import Web3 from 'web3';
import getWeb3 from './util/getWeb3';

// contract
import ContractDC from './common/contract/ContractDC';

// view
import UserVC from './user/vc/UserVC';

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
        const accounts = await ContractDC.getAccount();

        this.setState({
            web3,
            account: accounts[0],
        }, () => {
            console.log(this.state.account)
        });
    }

    render() {
        const { web3, account } = this.state;
        return (
            <div>
                {web3 ? (
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
                    <p>Web3 is loading</p>}
                {web3 ? <UserVC web3={web3} account={account} /> : null}
            </div>
        );
    }
}

export default App;