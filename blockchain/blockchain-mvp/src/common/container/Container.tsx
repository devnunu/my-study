import React, { Component } from 'react';
import classNames from 'classnames';

// styles
import styles from './Container.scss';

interface ContainerProps {
  className?: string;
}

class Container extends Component<ContainerProps, {}> {
  render() {
    return (
      <section className={classNames(styles.container, this.props.className)}>
        {this.props.children}
      </section>
    );
  }
}

export default Container;
