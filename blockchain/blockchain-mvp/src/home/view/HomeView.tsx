import React, { Component } from 'react';
import TruffleContract from 'truffle-contract';
import Web3 from 'web3';

const EntityManagerContract = TruffleContract(require('../../../build/contracts/EntityManager.json'));

interface HomeViewProps {
  web3: Web3;
}

class HomeView extends Component<HomeViewProps, {}> {
  public async componentWillMount() {
    EntityManagerContract.setProvider(this.props.web3.currentProvider);
    let instance;
    try {
      instance = await EntityManagerContract.deployed();
    } catch (err) {
      alert(err);
      return;
    }

    const result = await instance.getUsers();
    console.log(result);
  }
  render() {
    return (
      <div>
        <h1>Hello World!</h1>
        <p>this is march mvp web page, enjoy!</p>
      </div>
    );
  }
}

export default HomeView;
