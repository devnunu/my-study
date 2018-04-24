pragma solidity ^0.4.17;


contract User {

    struct PersonalData {
        address userAddress;
        string name;
        uint age;
        string job;
    }

    PersonalData personalData;
    
    function User(string _name, uint _age, string _job) public {
        personalData.userAddress = msg.sender;
        personalData.name = _name;
        personalData.age = _age;
        personalData.job = _job;
    }

}