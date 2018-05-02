import BigNumber from 'bignumber.js';

export interface User {
  name: string;
  age: BigNumber.BigNumber;
  email: string;
}

export default interface UserInit {
  address: string;
  addUser(_name: string, _age: BigNumber.BigNumber, _email: string, obj: Object);
  OnAddUser(obj: Object);
}
