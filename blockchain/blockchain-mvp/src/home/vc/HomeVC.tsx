import React, { Component } from 'react';
import TruffleContract from 'truffle-contract';
import Web3 from 'web3';

// util
import getWeb3 from '../../common/util/getWeb3';

// view
import Container from '../../common/view/container/Container';
import HomeView from '../view/HomeView';

// styles
import styles from './HomeVC.scss';

interface HomeVCState {
  web3: Web3;
}

class HomeVC extends Component<{}, HomeVCState> {
  state = {
    web3: null,
  };

  public async componentWillMount() {
    const web3 = await getWeb3();
    this.setState({
      web3,
    });
  }

  render() {
    return (
      this.state.web3 &&
      (<Container className={styles.contentContainer}>
        <HomeView web3={this.state.web3} />
      </Container>)
    );
  }
}

export default HomeVC;
