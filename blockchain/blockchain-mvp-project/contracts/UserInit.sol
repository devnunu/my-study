pragma solidity ^0.4.17;


contract UserInit {
    uint public value;
    event ValueSet(uint val);

    function setValue(uint val) public {
        value = val;
        ValueSet(value);
    }

    function getValue() public constant returns (uint) {
        return value;
    }
}
