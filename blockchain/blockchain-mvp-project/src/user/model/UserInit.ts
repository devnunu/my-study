import { BigNumber } from 'bignumber.js';

export class UserInfo {
  index: number;
  age: number;
  name: string;
  email: string;
  userAddress: string;

  constructor(index: number = undefined, age: number = undefined, name: string = undefined, email: string = undefined, userAddress?: string) {
    this.index = index;
    this.name = name;
    this.email = email;
    this.age = age;
    this.userAddress = '0x0';
  }
}

export default interface UserInit {
  address: string;
}
