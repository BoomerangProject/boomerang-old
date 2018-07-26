const Kudos = artifacts.require("./Kudos.sol");

module.exports = function(deployer) {

  const kudosTestRpcTokenContractAddress = '0xef2038a77aa75c82ffdc485ff737730ebda6d81b';
  deployer.deploy(Kudos, kudosTestRpcTokenContractAddress);
};
