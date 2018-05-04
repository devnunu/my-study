import React, { Component } from 'react';

// model
import { UserInfo } from '../model/UserInit';

// styles
import styles from './UserListView.scss'

interface UserListViewProps {
  userList: UserInfo[];
}

class UserListView extends Component<UserListViewProps, {}> {
  render() {
    const { userList } = this.props;
    return (
      <div className={styles.userListView}>
        <div className={styles.title}>User List</div>
        <table>
          <tr>
            <th>Address</th>
            <th>Age</th>
            <th>Name</th>
            <th>Email</th>
          </tr>
          {userList.map((item, index) => {
            return (
              <tr key={index}>
                <td>{item.userAddress}</td>
                <td>{item.age}</td>
                <td>{item.name}</td>
                <td>{item.email}</td>
              </tr>);
          })}
        </table>
      </div>
    )
  }
}

export default UserListView;
