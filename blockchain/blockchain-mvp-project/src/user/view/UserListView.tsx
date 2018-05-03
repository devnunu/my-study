import React, { Component } from 'react';

// model
import { UserInfo } from '../model/UserInit';

interface UserListViewProps {
  userList: UserInfo[];
}

class UserListView extends Component<UserListViewProps, {}> {
  render() {
    const { userList } = this.props;
    return (
      <div>
        hihihi
        {userList.map((item, index) => {
          return (
            <div key={index}>
              <div>Address: {item.userAddress}</div>
              <div>Age: {item.age.toNumber()}</div>
              <div>Name: {item.name}</div>
              <div>Email: {item.email}</div>
            </div>);
        })}
      </div>
    )
  }
}

export default UserListView;
