import React, { Component } from 'react';

// styles
import styles from './UserDeleteView.scss';

interface UserDeleteViewProps {
  onClickUserDelete: (userAddress: string) => void;
}

interface UserDeleteViewState {
  userAddress: string;
}

class UserDeleteView extends Component<UserDeleteViewProps, UserDeleteViewState> {

  onChangeUserAddress(event) {
    const userAddress = event.target.value;
    this.setState({ ...this.state, userAddress });
  }
  render() {
    return (
      <div className={styles.contentsContainer}>
        <div className={styles.title} >Delete User</div>
        <div className={styles.inputWarpper}>
          <span>주소</span>
          <input onChange={this.onChangeUserAddress.bind(this)} type="text" />
        </div>
        <div className={styles.buttonWrapper}>
          <div onClick={() => this.props.onClickUserDelete(this.state.userAddress)} className={styles.submitButton}>전송</div>
        </div>
      </div>
    )
  }
}

export default UserDeleteView;
