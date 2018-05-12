import React, { Component } from 'react';

// model
import { UserInfo } from '../model/UserInit';

// styles
import styles from './UserRegisterView.scss';

interface UserRegisterViewProps {
  onClickUserRegister: (userInfo: UserInfo) => void;
}

interface UserRegisterViewState {
  userInfo: UserInfo;
}

class UserRegisterView extends Component<UserRegisterViewProps, UserRegisterViewState>{

  state = {
    ...this.state,
    userInfo: new UserInfo(),
  }

  onChangeUserAddress = (event) => {
    this.state.userInfo.userAddress = event.target.value;
  }

  onChangeName = (event) => {
    this.state.userInfo.name = event.target.value;
  }

  onChangeAge = (event) => {
    this.state.userInfo.age = event.target.value;
  }

  onChangeEmail = (event) => {
    this.state.userInfo.email = event.target.value;
  }

  render() {
    return (
      <div className={styles.contentsContainer}>
        <div className={styles.title}>Register User</div>
        <section className={styles.leftSection}>
          <div className={styles.inputWarpper}>
            <span>주소</span>
            <input onChange={this.onChangeUserAddress.bind(this)} type="text" />
          </div>
          <div className={styles.inputWarpper}>
            <span>이름</span>
            <input onChange={this.onChangeName.bind(this)} type="text" />
          </div>
        </section>
        <section className={styles.rightSection}>
          <div className={styles.inputWarpper}>
            <span>나이</span>
            <input onChange={this.onChangeAge.bind(this)} type="number" />
          </div>
          <div className={styles.inputWarpper}>
            <span>이메일</span>
            <input onChange={this.onChangeEmail.bind(this)} type="text" />
          </div>
        </section>
        <div className={styles.buttonWrapper}>
          <div onClick={() => this.props.onClickUserRegister(this.state.userInfo)} className={styles.submitButton}>전송</div>
        </div>
      </div>
    )
  }
}

export default UserRegisterView;
