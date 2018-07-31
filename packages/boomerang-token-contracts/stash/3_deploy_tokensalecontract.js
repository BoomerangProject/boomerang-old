var SafeMath = artifacts.require("./SafeMath.sol");
var BoomerangTokenSale = artifacts.require("./BoomerangTokenSale.sol");

module.exports = function(deployer) {
   deployer.deploy(SafeMath);
   deployer.link(SafeMath, BoomerangTokenSale);

   var wallet = '';
   var startTime = 1509541200;
   var tokenContractAddress = '';

   deployer.deploy(BoomerangTokenSale, wallet, startTime, tokenContractAddress);
};
