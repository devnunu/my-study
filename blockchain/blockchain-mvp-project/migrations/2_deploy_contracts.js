const UserInit = artifacts.require("./UserInit.sol");

module.exports = function(deployer) {
  deployer.deploy(UserInit);
};
