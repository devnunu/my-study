import React, { Component } from 'react';
import Web3 from 'web3';
import getWeb3 from './util/getWeb3';

// view
import UserVC from './user/vc/UserVC';

interface AppState {
    web3: Web3;
}

class App extends Component<{}, {}> {

    state = {
        web3: null,
    }

    public async componentWillMount() {
        const web3 = await getWeb3();
        this.setState({
            web3,
        });
    }

    render() {
        const { web3 } = this.state;
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
                {web3 ? <UserVC web3={web3} /> : null}
            </div>
        );
    }
}

export default App;