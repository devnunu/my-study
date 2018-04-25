import React, { Component } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import Container from '../container/Container';

// styles
import styles from './Nav.scss';

class Nav extends Component<{}, {}> {
  render() {
    return (
      <div className={styles.navigation}>
        <Container className={styles.contentsContainer}>
          <div className={styles.marchLogo}>
            <Link to={'/'}>
              <img src={require('../../assets/img/march-white-logo.png')} />
            </Link>
          </div>
          <ul className={styles.navBtnList}>
            <Link to={'/user'}>user</Link>
          </ul>
        </Container>
      </div>
    );
  }
}

export default Nav;
