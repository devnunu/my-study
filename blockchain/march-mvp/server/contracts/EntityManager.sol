pragma solidity ^0.4.17;

import "./User.sol";


contract EntityManager {
    User[] users;
    uint userCount = 0;

    function addUser(string name, uint age, string job) public {
        users[userCount++] = new User(name, age, job);
    }

    function getUsers() public view returns (User[]) {
        return users;
    }
}