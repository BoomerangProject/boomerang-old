const Boomerang = artifacts.require("./Boomerang.sol");

module.exports = function(deployer) {

  const boomerangTestRpcTokenContractAddress = '0x41103fe87baa847c18d7e4b991ce30670baaa40f';
  deployer.deploy(Boomerang, boomerangTestRpcTokenContractAddress);
};
