import { BigNumber } from 'bignumber.js';

export class UserInfo {
  index: number;
  age: BigNumber;
  name: string;
  email: string;

  constructor(index, name, age, email) {
    this.index = index;
    this.name = name;
    this.email = email;
    this.age = age;
  }
}

export default interface UserInit {
  address: string;
}
