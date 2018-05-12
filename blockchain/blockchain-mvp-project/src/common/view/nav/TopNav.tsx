import React, { Component } from 'react';

// styles
import styles from './TopNav.scss';

class TopNav extends Component<{}, {}>{
  render() {
    return (
      <div className={styles.topNav}>
        <div className={styles.logo}>
          <img src={require('../../../assets/img/march-white-logo.png')} />
        </div>
        <div className={styles.rightSection}>
          <a href='https://www.march.eco/'>march home</a>
        </div>
      </div>
    )
  }
}

export default TopNav;
