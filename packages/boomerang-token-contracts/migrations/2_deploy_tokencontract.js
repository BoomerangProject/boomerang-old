var SafeMath = artifacts.require("./SafeMath.sol");
var BoomerangToken = artifacts.require("./BoomerangToken.sol");

module.exports = function(deployer) {
  deployer.deploy(SafeMath);
  deployer.link(SafeMath, BoomerangToken);
  deployer.deploy(BoomerangToken);
};
