import { BigNumber } from 'bignumber.js';

export class UserInfo {
  userAddress: string;
  name: string;
  age: BigNumber;
  email: string;

  constructor(userAddress: string, name: string, age: BigNumber, email: string) {
    this.userAddress = userAddress;
    this.name = name;
    this.age = age;
    this.email = email;
  }
}

export default interface UserInit {
  address: string;
}
