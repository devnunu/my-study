import React, { Component } from 'react';
import { Link } from 'react-router-dom';

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
              <div key={index} className={styles.title}>
                <Link to={item.path}>{item.title}</Link>
              </div>
            );
          })}
        </section>
        <section className={styles.contentSection}>
          {this.props.children}
        </section>
      </div>
    );
  }
}

export default SideNav;
