const BigNumber = web3.BigNumber;
import { ipfsHash, rewardSystem } from './helpers/mockData';
import completeOneUserRewardCycle from './helpers/completeOneUserRewardCycle';
import completeOneWorkerRewardCycle from './helpers/completeOneWorkerRewardCycle';
import fillGrowthPool from './helpers/fillGrowthPool';

require("chai")
  .use(require("chai-as-promised"))
  .use(require("chai-bignumber")(BigNumber))
  .should();

const Kudos = artifacts.require("Kudos");
const KudosToken = artifacts.require("KudosToken");

contract("KudosGrowthPoolRewardSystemTests", function([deployerAddress, userAddress, workerAddress, businessAddress]) {

  let kudos;
  let kudosToken;


  beforeEach(async function() {

    kudosToken = await KudosToken.new();
    kudos = await Kudos.new(kudosToken.address);
  });

  it("deployer should be able to register growth pool reward system", async function() {

    await kudos.registerGrowthPoolRewardSystem(rewardSystem.numberOfRewardSteps, rewardSystem.numberOfRewardCyclesForLevel, rewardSystem.numberOfRewardLevels, rewardSystem.levelRewards, ipfsHash, {from: deployerAddress});
    const growthPoolRewardSystemStruct = await kudos.getGrowthPoolRewardSystem();

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

    await kudos.registerGrowthPoolRewardSystem(rewardSystem.numberOfRewardSteps, rewardSystem.numberOfRewardCyclesForLevel, rewardSystem.numberOfRewardLevels, rewardSystem.levelRewards, ipfsHash, {from: businessAddress}).should.be.rejected;
  });

  //
  //
  //

  it("deployer should be able to add businesses to the growth pool reward system", async function() {
    await kudos.addBusinessesToGrowthPoolRewardsSystem([businessAddress], {from: deployerAddress});
    const businessIsGrowthPoolBusiness = await kudos.growthPoolBusiness(businessAddress);
    businessIsGrowthPoolBusiness.should.equal(true);
  });

  it("non-deployer should not be able to add businesses to the growth pool reward system", async function() {
    await kudos.addBusinessesToGrowthPoolRewardsSystem([businessAddress], {from: businessAddress}).should.be.rejected;
  });

  /**/

  it("deployer should be able to remove businesses from the growth pool reward system", async function() {

    await kudos.addBusinessesToGrowthPoolRewardsSystem([businessAddress], {from: deployerAddress});
    let businessIsGrowthPoolBusiness = await kudos.growthPoolBusiness(businessAddress);
    businessIsGrowthPoolBusiness.should.equal(true);

    await kudos.removeBusinessesFromGrowthPoolRewardsSystem([businessAddress], {from: deployerAddress});
    businessIsGrowthPoolBusiness = await kudos.growthPoolBusiness(businessAddress);
    businessIsGrowthPoolBusiness.should.equal(false);
  });


  it("non-deployer should not be able to remove businesses from the growth pool reward system", async function() {

    await kudos.addBusinessesToGrowthPoolRewardsSystem([businessAddress], {from: deployerAddress});
    const businessIsGrowthPoolBusiness = await kudos.growthPoolBusiness(businessAddress);
    businessIsGrowthPoolBusiness.should.equal(true);

    await kudos.removeBusinessesFromGrowthPoolRewardsSystem([businessAddress], {from: businessAddress}).should.be.rejected;
  });

  //
  //
  //

  it("user should receive rewards from the growth pool if the business is registered with the growth pool", async function() {

    await kudos.registerGrowthPoolRewardSystem(rewardSystem.numberOfRewardSteps, rewardSystem.numberOfRewardCyclesForLevel, rewardSystem.numberOfRewardLevels, rewardSystem.levelRewards, ipfsHash, {from: deployerAddress});

    await fillGrowthPool(kudosToken, deployerAddress, kudos.address);

    await kudos.addBusinessesToGrowthPoolRewardsSystem([businessAddress], {from: deployerAddress});
    await completeOneUserRewardCycle(kudos, userAddress, workerAddress, businessAddress);

    const balance = await kudosToken.balanceOf(userAddress);
    Number(balance).should.equal(rewardSystem.levelRewards[0]);
  });

  it("user should not receive rewards from the growth pool if the business is not registered with the growth pool", async function() {

    await kudos.registerGrowthPoolRewardSystem(rewardSystem.numberOfRewardSteps, rewardSystem.numberOfRewardCyclesForLevel, rewardSystem.numberOfRewardLevels, rewardSystem.levelRewards, ipfsHash, {from: deployerAddress});

    await fillGrowthPool(kudosToken, deployerAddress, kudos.address);
    await completeOneUserRewardCycle(kudos, userAddress, workerAddress, businessAddress);

    const balance = await kudosToken.balanceOf(userAddress);
    Number(balance).should.equal(0);
  });

  /**/

  it("worker should receive rewards from the growth pool if the business is registered with the growth pool", async function() {

    await kudos.registerGrowthPoolRewardSystem(rewardSystem.numberOfRewardSteps, rewardSystem.numberOfRewardCyclesForLevel, rewardSystem.numberOfRewardLevels, rewardSystem.levelRewards, ipfsHash, {from: deployerAddress});

    await fillGrowthPool(kudosToken, deployerAddress, kudos.address);
    await kudos.addBusinessesToGrowthPoolRewardsSystem([businessAddress], {from: deployerAddress});

    await completeOneWorkerRewardCycle(kudos, userAddress, workerAddress, businessAddress);

    const balance = await kudosToken.balanceOf(workerAddress);
    Number(balance).should.equal(rewardSystem.levelRewards[0]);
  });

  it("worker should not receive rewards from the growth pool if the business is not registered with the growth pool", async function() {

    await kudos.registerGrowthPoolRewardSystem(rewardSystem.numberOfRewardSteps, rewardSystem.numberOfRewardCyclesForLevel, rewardSystem.numberOfRewardLevels, rewardSystem.levelRewards, ipfsHash, {from: deployerAddress});

    await fillGrowthPool(kudosToken, deployerAddress, kudos.address);

    await completeOneWorkerRewardCycle(kudos, userAddress, workerAddress, businessAddress);

    const balance = await kudosToken.balanceOf(workerAddress);
    Number(balance).should.equal(0);
  });

});
