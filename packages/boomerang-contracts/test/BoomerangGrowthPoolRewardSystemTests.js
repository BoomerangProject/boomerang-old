const BigNumber = web3.BigNumber;
import { ipfsHash, rewardSystem } from './helpers/mockData';
import completeOneUserRewardCycle from './helpers/completeOneUserRewardCycle';
import completeOneWorkerRewardCycle from './helpers/completeOneWorkerRewardCycle';
import fillGrowthPool from './helpers/fillGrowthPool';
import Signer from './helpers/signer';
import { getBoomerangAuthContract, getBoomerangUserContract, getBoomerangWorkerContract, getBoomerangBusinessContract, getBoomerangTokenContract, getBoomerangRewardsContract, getBoomerangExperienceContract } from './helpers/contractInstances';

require("chai")
  .use(require("chai-as-promised"))
  .use(require("chai-bignumber")(BigNumber))
  .should();

contract("BoomerangGrowthPoolRewardSystemTests", function([deployerAddress, userAddress, workerAddress, businessAddress]) {

  let boomerangAuthContract;
  let boomerangWorkerContract;
  let boomerangBusinessContract;
  let boomerangTokenContract;
  let boomerangRewardsContract;
  let boomerangExperienceContract;

  let ratingSigner;

  beforeEach(async function() {

    boomerangAuthContract = await getBoomerangAuthContract();
    boomerangWorkerContract = await getBoomerangWorkerContract(boomerangAuthContract.address);
    boomerangBusinessContract = await getBoomerangBusinessContract(boomerangAuthContract.address);
    boomerangTokenContract = await getBoomerangTokenContract();
    boomerangRewardsContract = await getBoomerangRewardsContract(boomerangAuthContract.address, boomerangTokenContract.address);
    boomerangExperienceContract = await getBoomerangExperienceContract(boomerangWorkerContract.address, boomerangBusinessContract.address, boomerangRewardsContract.address);

    ratingSigner = await new Signer(userAddress);
  });

  it("deployer should be able to register growth pool reward system", async function() {

    await boomerangRewardsContract.registerGrowthPoolRewardSystem(rewardSystem.numberOfRewardSteps, rewardSystem.numberOfRewardCyclesForLevel, rewardSystem.numberOfRewardLevels, rewardSystem.levelRewards, ipfsHash, {from: deployerAddress});
    const growthPoolRewardSystemStruct = await boomerangRewardsContract.getGrowthPoolRewardSystem();

    Number(growthPoolRewardSystemStruct[0]).should.equal(rewardSystem.numberOfRewardSteps);

    for (let i = 0; i < rewardSystem.numberOfRewardCyclesForLevel.length; i++) {
      Number(growthPoolRewardSystemStruct[1][i]).should.equal(rewardSystem.numberOfRewardCyclesForLevel[i]);
    }

    Number(growthPoolRewardSystemStruct[2]).should.equal(rewardSystem.numberOfRewardLevels);

    for (let i = 0; i < rewardSystem.levelRewards.length; i++) {
      Number(growthPoolRewardSystemStruct[3][i]).should.equal(rewardSystem.levelRewards[i]);
    }

    growthPoolRewardSystemStruct[4].should.equal(ipfsHash);
  });

  it("non-deployer should not be able to register growth pool reward system", async function() {

    await boomerangRewardsContract.registerGrowthPoolRewardSystem(rewardSystem.numberOfRewardSteps, rewardSystem.numberOfRewardCyclesForLevel, rewardSystem.numberOfRewardLevels, rewardSystem.levelRewards, ipfsHash, {from: businessAddress}).should.be.rejected;
  });

  //
  //
  //

  it("deployer should be able to add businesses to the growth pool reward system", async function() {
    await boomerangRewardsContract.addBusinessesToGrowthPoolRewardsSystem([businessAddress], {from: deployerAddress});
    const businessIsGrowthPoolBusiness = await boomerangRewardsContract.growthPoolBusiness(businessAddress);
    businessIsGrowthPoolBusiness.should.equal(true);
  });

  it("non-deployer should not be able to add businesses to the growth pool reward system", async function() {
    await boomerangRewardsContract.addBusinessesToGrowthPoolRewardsSystem([businessAddress], {from: businessAddress}).should.be.rejected;
  });

  /**/

  it("deployer should be able to remove businesses from the growth pool reward system", async function() {

    await boomerangRewardsContract.addBusinessesToGrowthPoolRewardsSystem([businessAddress], {from: deployerAddress});
    let businessIsGrowthPoolBusiness = await boomerangRewardsContract.growthPoolBusiness(businessAddress);
    businessIsGrowthPoolBusiness.should.equal(true);

    await boomerangRewardsContract.removeBusinessesFromGrowthPoolRewardsSystem([businessAddress], {from: deployerAddress});
    businessIsGrowthPoolBusiness = await boomerangRewardsContract.growthPoolBusiness(businessAddress);
    businessIsGrowthPoolBusiness.should.equal(false);
  });


  it("non-deployer should not be able to remove businesses from the growth pool reward system", async function() {

    await boomerangRewardsContract.addBusinessesToGrowthPoolRewardsSystem([businessAddress], {from: deployerAddress});
    const businessIsGrowthPoolBusiness = await boomerangRewardsContract.growthPoolBusiness(businessAddress);
    businessIsGrowthPoolBusiness.should.equal(true);

    await boomerangRewardsContract.removeBusinessesFromGrowthPoolRewardsSystem([businessAddress], {from: businessAddress}).should.be.rejected;
  });

  //
  //
  //

  it("user should receive rewards from the growth pool if the business is registered with the growth pool", async function() {

    await boomerangRewardsContract.registerGrowthPoolRewardSystem(rewardSystem.numberOfRewardSteps, rewardSystem.numberOfRewardCyclesForLevel, rewardSystem.numberOfRewardLevels, rewardSystem.levelRewards, ipfsHash, {from: deployerAddress});

    await fillGrowthPool(boomerangTokenContract, deployerAddress, boomerangRewardsContract.address);

    await boomerangRewardsContract.addBusinessesToGrowthPoolRewardsSystem([businessAddress], {from: deployerAddress});
    await completeOneUserRewardCycle(boomerangExperienceContract, ratingSigner, userAddress, workerAddress, businessAddress);

    const balance = await boomerangTokenContract.balanceOf(userAddress);
    Number(balance).should.equal(rewardSystem.levelRewards[0]);
  });

  it("user should not receive rewards from the growth pool if the business is not registered with the growth pool", async function() {

    await boomerangRewardsContract.registerGrowthPoolRewardSystem(rewardSystem.numberOfRewardSteps, rewardSystem.numberOfRewardCyclesForLevel, rewardSystem.numberOfRewardLevels, rewardSystem.levelRewards, ipfsHash, {from: deployerAddress});

    await fillGrowthPool(boomerangTokenContract, deployerAddress, boomerangRewardsContract.address);
    await completeOneUserRewardCycle(boomerangExperienceContract, ratingSigner, userAddress, workerAddress, businessAddress);

    const balance = await boomerangTokenContract.balanceOf(userAddress);
    Number(balance).should.equal(0);
  });

  /**/

  it("worker should receive rewards from the growth pool if the business is registered with the growth pool", async function() {

    await boomerangRewardsContract.registerGrowthPoolRewardSystem(rewardSystem.numberOfRewardSteps, rewardSystem.numberOfRewardCyclesForLevel, rewardSystem.numberOfRewardLevels, rewardSystem.levelRewards, ipfsHash, {from: deployerAddress});

    await fillGrowthPool(boomerangTokenContract, deployerAddress, boomerangRewardsContract.address);
    await boomerangRewardsContract.addBusinessesToGrowthPoolRewardsSystem([businessAddress], {from: deployerAddress});

    await completeOneWorkerRewardCycle(boomerangExperienceContract, ratingSigner, userAddress, workerAddress, businessAddress);

    const balance = await boomerangTokenContract.balanceOf(workerAddress);
    Number(balance).should.equal(rewardSystem.levelRewards[0]);
  });

  it("worker should not receive rewards from the growth pool if the business is not registered with the growth pool", async function() {

    await boomerangRewardsContract.registerGrowthPoolRewardSystem(rewardSystem.numberOfRewardSteps, rewardSystem.numberOfRewardCyclesForLevel, rewardSystem.numberOfRewardLevels, rewardSystem.levelRewards, ipfsHash, {from: deployerAddress});

    await fillGrowthPool(boomerangTokenContract, deployerAddress, boomerangRewardsContract.address);

    await completeOneWorkerRewardCycle(boomerangExperienceContract, ratingSigner, userAddress, workerAddress, businessAddress);

    const balance = await boomerangTokenContract.balanceOf(workerAddress);
    Number(balance).should.equal(0);
  });

});
