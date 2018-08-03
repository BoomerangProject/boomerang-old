const Boomerang = artifacts.require("./Boomerang.sol");

module.exports = function(deployer) {

  const boomerangTokenContractAddress = '0xe6bf3a8a345dc331e429a331b48f4ff2fa96cebd';
  deployer.deploy(Boomerang, boomerangTokenContractAddress);
};
