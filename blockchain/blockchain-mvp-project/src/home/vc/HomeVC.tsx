import React, { Component } from 'react';
import Web3 from 'web3';

// styles
import styles from './HomeVC.scss'

interface HomeVCProps {
  web3: Web3;
  account: string;
}

class HomeVC extends Component<HomeVCProps, {}>{
  render() {
    const { web3 } = this.props;
    return (
      <div className={styles.homeVC}>
        <div className={styles.contents}>
          <p>
            안녕하세요 March에 오신것을 환영합니다.
          </p>
          <p>
            지금 동작중인 provider는
        {(web3.currentProvider as any).isMetaMask && (
              ' 메타마스크'
            )}
            {(window as any).mist && (
              ' 미스트'
            )}
            {((web3.currentProvider as any).host && (
              ' 로컬 호스트'
            ))}
            입니다.
        </p>
        </div>
      </div>
    )
  }
}

export default HomeVC;
