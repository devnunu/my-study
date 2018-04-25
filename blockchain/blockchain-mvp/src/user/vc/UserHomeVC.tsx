
import React, { Component } from 'react';

// view
import Container from '../../common/container/Container';

// styels
import styles from './UserHomeVC.scss'

class UserHomeVC extends Component {
  render() {
    return (
      <Container className={styles.contentsContainer}>
        <div>
          <p>hello! this is user home page, can you see our users?</p>
          <p>is it awesome?? well, how about join march!</p>
        </div>
      </Container>
    )
  }
}

export default UserHomeVC;
