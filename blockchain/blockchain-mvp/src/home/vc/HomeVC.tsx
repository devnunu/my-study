import React, { Component } from 'react';

// view
import Container from '../../common/container/Container';

// styles
import styles from './HomeVC.scss';

class HomeVC extends Component {
  render() {
    return (
      <Container className={styles.contentContainer}>
        <div>
          <h1>Hello World!</h1>
          <p>this is march mvp web page, enjoy!</p>
        </div>
      </Container>
    );
  }
}

export default HomeVC;
