pragma solidity ^0.4.17;


contract Test {
    uint value;
    event LogSetValue (uint value);

    function setValue(uint _value) public {
        value = _value;
        LogSetValue(_value);
    }

    function getValue() public view returns(uint) {
        return value;
    }
}