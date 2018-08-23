const BoomerangToken = artifacts.require("BoomerangToken");
const BoomerangAuthContract = artifacts.require("BoomerangAuthContract");
const BoomerangUserContract = artifacts.require("BoomerangUserContract");
const BoomerangWorkerContract = artifacts.require("BoomerangWorkerContract");
const BoomerangBusinessContract = artifacts.require("BoomerangBusinessContract");
const BoomerangRewardsContract = artifacts.require("BoomerangRewardsContract");
const BoomerangExperienceContract = artifacts.require("BoomerangExperienceContract");

module.exports = async function(deployer) {

  // deployer.deploy(SafeMath);
  // deployer.link(SafeMath, BoomerangToken);
  // deployer.deploy(BoomerangToken);

  // const boomerangTokenContractAddress = '0xe6bf3a8a345dc331e429a331b48f4ff2fa96cebd';


  const boomerangToken = deployer.deploy(BoomerangToken).then(async function (boomerangToken) {

    const boomerangAuthContract = await deployer.deploy(BoomerangAuthContract);
    const boomerangUserContract = await deployer.deploy(BoomerangUserContract, boomerangAuthContract.address);
    const boomerangWorkerContract = await deployer.deploy(BoomerangWorkerContract, boomerangAuthContract.address);
    const boomerangBusinessContract = await deployer.deploy(BoomerangBusinessContract, boomerangAuthContract.address);

    await boomerangWorkerContract.updateBusinessContract(boomerangBusinessContract.address);
    await boomerangBusinessContract.updateWorkerContract(boomerangWorkerContract.address);

    const boomerangRewardsContract = await deployer.deploy(BoomerangBusinessContract, boomerangToken.address);
    const boomerangExperienceContract = await deployer.deploy(BoomerangExperienceContract, boomerangWorkerContract.address, boomerangBusinessContract.address, boomerangRewardsContract.address);
  });
};