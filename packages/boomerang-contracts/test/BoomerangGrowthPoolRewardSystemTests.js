const BigNumber = web3.BigNumber;
import { ipfsHash, rewardSystem } from './helpers/mockData';
import completeOneUserRewardCycle from './helpers/completeOneUserRewardCycle';
import completeOneWorkerRewardCycle from './helpers/completeOneWorkerRewardCycle';
import fillGrowthPool from './helpers/fillGrowthPool';

require("chai")
  .use(require("chai-as-promised"))
  .use(require("chai-bignumber")(BigNumber))
  .should();

const Boomerang = artifacts.require("Boomerang");
const BoomerangToken = artifacts.require("BoomerangToken");

contract("BoomerangGrowthPoolRewardSystemTests", function([deployerAddress, userAddress, workerAddress, businessAddress]) {

  let boomerang;
  let boomerangToken;


  beforeEach(async function() {

    boomerangToken = await BoomerangToken.new();
    boomerang = await Boomerang.new(boomerangToken.address);
  });

  it("deployer should be able to register growth pool reward system", async function() {

    await boomerang.registerGrowthPoolRewardSystem(rewardSystem.numberOfRewardSteps, rewardSystem.numberOfRewardCyclesForLevel, rewardSystem.numberOfRewardLevels, rewardSystem.levelRewards, ipfsHash, {from: deployerAddress});
    const growthPoolRewardSystemStruct = await boomerang.getGrowthPoolRewardSystem();

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

    await boomerang.registerGrowthPoolRewardSystem(rewardSystem.numberOfRewardSteps, rewardSystem.numberOfRewardCyclesForLevel, rewardSystem.numberOfRewardLevels, rewardSystem.levelRewards, ipfsHash, {from: businessAddress}).should.be.rejected;
  });

  //
  //
  //

  it("deployer should be able to add businesses to the growth pool reward system", async function() {
    await boomerang.addBusinessesToGrowthPoolRewardsSystem([businessAddress], {from: deployerAddress});
    const businessIsGrowthPoolBusiness = await boomerang.growthPoolBusiness(businessAddress);
    businessIsGrowthPoolBusiness.should.equal(true);
  });

  it("non-deployer should not be able to add businesses to the growth pool reward system", async function() {
    await boomerang.addBusinessesToGrowthPoolRewardsSystem([businessAddress], {from: businessAddress}).should.be.rejected;
  });

  /**/

  it("deployer should be able to remove businesses from the growth pool reward system", async function() {

    await boomerang.addBusinessesToGrowthPoolRewardsSystem([businessAddress], {from: deployerAddress});
    let businessIsGrowthPoolBusiness = await boomerang.growthPoolBusiness(businessAddress);
    businessIsGrowthPoolBusiness.should.equal(true);

    await boomerang.removeBusinessesFromGrowthPoolRewardsSystem([businessAddress], {from: deployerAddress});
    businessIsGrowthPoolBusiness = await boomerang.growthPoolBusiness(businessAddress);
    businessIsGrowthPoolBusiness.should.equal(false);
  });


  it("non-deployer should not be able to remove businesses from the growth pool reward system", async function() {

    await boomerang.addBusinessesToGrowthPoolRewardsSystem([businessAddress], {from: deployerAddress});
    const businessIsGrowthPoolBusiness = await boomerang.growthPoolBusiness(businessAddress);
    businessIsGrowthPoolBusiness.should.equal(true);

    await boomerang.removeBusinessesFromGrowthPoolRewardsSystem([businessAddress], {from: businessAddress}).should.be.rejected;
  });

  //
  //
  //

  it("user should receive rewards from the growth pool if the business is registered with the growth pool", async function() {

    await boomerang.registerGrowthPoolRewardSystem(rewardSystem.numberOfRewardSteps, rewardSystem.numberOfRewardCyclesForLevel, rewardSystem.numberOfRewardLevels, rewardSystem.levelRewards, ipfsHash, {from: deployerAddress});

    await fillGrowthPool(boomerangToken, deployerAddress, boomerang.address);

    await boomerang.addBusinessesToGrowthPoolRewardsSystem([businessAddress], {from: deployerAddress});
    await completeOneUserRewardCycle(boomerang, userAddress, workerAddress, businessAddress);

    const balance = await boomerangToken.balanceOf(userAddress);
    Number(balance).should.equal(rewardSystem.levelRewards[0]);
  });

  it("user should not receive rewards from the growth pool if the business is not registered with the growth pool", async function() {

    await boomerang.registerGrowthPoolRewardSystem(rewardSystem.numberOfRewardSteps, rewardSystem.numberOfRewardCyclesForLevel, rewardSystem.numberOfRewardLevels, rewardSystem.levelRewards, ipfsHash, {from: deployerAddress});

    await fillGrowthPool(boomerangToken, deployerAddress, boomerang.address);
    await completeOneUserRewardCycle(boomerang, userAddress, workerAddress, businessAddress);

    const balance = await boomerangToken.balanceOf(userAddress);
    Number(balance).should.equal(0);
  });

  /**/

  it("worker should receive rewards from the growth pool if the business is registered with the growth pool", async function() {

    await boomerang.registerGrowthPoolRewardSystem(rewardSystem.numberOfRewardSteps, rewardSystem.numberOfRewardCyclesForLevel, rewardSystem.numberOfRewardLevels, rewardSystem.levelRewards, ipfsHash, {from: deployerAddress});

    await fillGrowthPool(boomerangToken, deployerAddress, boomerang.address);
    await boomerang.addBusinessesToGrowthPoolRewardsSystem([businessAddress], {from: deployerAddress});

    await completeOneWorkerRewardCycle(boomerang, userAddress, workerAddress, businessAddress);

    const balance = await boomerangToken.balanceOf(workerAddress);
    Number(balance).should.equal(rewardSystem.levelRewards[0]);
  });

  it("worker should not receive rewards from the growth pool if the business is not registered with the growth pool", async function() {

    await boomerang.registerGrowthPoolRewardSystem(rewardSystem.numberOfRewardSteps, rewardSystem.numberOfRewardCyclesForLevel, rewardSystem.numberOfRewardLevels, rewardSystem.levelRewards, ipfsHash, {from: deployerAddress});

    await fillGrowthPool(boomerangToken, deployerAddress, boomerang.address);

    await completeOneWorkerRewardCycle(boomerang, userAddress, workerAddress, businessAddress);

    const balance = await boomerangToken.balanceOf(workerAddress);
    Number(balance).should.equal(0);
  });

});
