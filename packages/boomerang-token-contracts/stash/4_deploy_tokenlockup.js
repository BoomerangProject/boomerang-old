var SafeMath = artifacts.require("./SafeMath.sol");
var BoomerangTokenLockup = artifacts.require("./BoomerangTokenLockup.sol");

module.exports = function(deployer) {
   deployer.deploy(SafeMath);
   deployer.link(SafeMath, BoomerangTokenLockup);

   var tokenContractAddress = '';
   var beneficiary = '';

   deployer.deploy(BoomerangTokenLockup, tokenContractAddress, beneficiary);
};
