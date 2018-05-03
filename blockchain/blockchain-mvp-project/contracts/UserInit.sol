pragma solidity ^0.4.17;


contract UserInit {
    uint public value;
    event ValueSet(uint val);
    event UserInsert(address userAddress, string name, uint age, string email);

    struct User {
        string name;
        uint age;
        string email;
        bool isUser;
    }

    mapping (address => User) users;

    function insertUser(
        address _userAddress,
        string _name,
        uint _age,
        string _email ) public
    {
        require(!isUser(_userAddress));
        users[_userAddress] = User(_name, _age, _email, true);
        UserInsert(_userAddress, _name, _age, _email);
    }

    function isUser(address userAddress) public view returns (bool) {
        return users[userAddress].isUser;
    }

    function setValue(uint val) public {
        value = val;
        ValueSet(value);
    }

    function getValue() public constant returns (uint) {
        return value;
    }
}
