pragma solidity ^0.4.17;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/UserInit.sol";

contract TestAdoption {
  UserInit userInit = UserInit(DeployedAddresses.UserInit());

  // Testing the adopt() function
  function testUserCanAdoptPet() public {
    uint expected = 8;
    userInit.setValue(8);
    uint value = userInit.getValue();

    Assert.equal(value, expected, "Adoption of pet ID 8 should be recorded.");
  }
}
