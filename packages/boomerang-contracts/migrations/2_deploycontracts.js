const Boomerang = artifacts.require("./Boomerang.sol");

module.exports = function(deployer) {

  const boomerangTestRpcTokenContractAddress = '0xef2038a77aa75c82ffdc485ff737730ebda6d81b';
  deployer.deploy(Boomerang, boomerangTestRpcTokenContractAddress);
};
