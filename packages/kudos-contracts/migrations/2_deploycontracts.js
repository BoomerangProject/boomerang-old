const Kudos = artifacts.require("./Kudos.sol");

module.exports = function(deployer) {

  const kudosTokenContractAddress = "0xea9c87533dfb343c9a5a7665c15ba46ee0804a46";
  deployer.deploy(Kudos, kudosTokenContractAddress);
};
