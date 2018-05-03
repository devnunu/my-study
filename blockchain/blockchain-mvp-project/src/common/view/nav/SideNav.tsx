import React, { Component } from 'react';

// styles
import styles from './SideNav.scss';

class SideNav extends Component<{}, {}>{

  navMenu = [
    {
      title: 'Home',
      path: 'home',
    },
    {
      title: 'DashBoard',
      path: 'dashboard',
    },
    {
      title: 'User',
      path: 'user',
    },
  ]

  render() {
    return (
      <div className={styles.sideNav}>
        <section className={styles.navSection}>
          {this.navMenu.map((item, index) => {
            return (
              <div className={styles.title}>{item.title}</div>
            );
          })}
        </section>
        <section className={styles.contentSection}>
          {this.props.children};
        </section>
      </div>
    );
  }
}

export default SideNav;
