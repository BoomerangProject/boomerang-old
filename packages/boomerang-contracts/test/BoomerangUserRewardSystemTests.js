
const BigNumber = web3.BigNumber;
import { ipfsHash, rewardSystem } from './helpers/mockData';
import assertUserRewardSystemStatus from './helpers/assertUserRewardSystemStatus';
import fillRewardPool from './helpers/fillRewardPool';
import completeOneUserRewardCycle from './helpers/completeOneUserRewardCycle';

require("chai")
  .use(require("chai-as-promised"))
  .use(require("chai-bignumber")(BigNumber))
  .should();

const Boomerang = artifacts.require("Boomerang");
const BoomerangToken = artifacts.require("BoomerangToken");

contract("BoomerangUserRewardSystemTests", function([deployerAddress, userAddress, workerAddress, businessAddress]) {

  let boomerang;
  let boomerangToken;

  beforeEach(async function() {

    boomerangToken = await BoomerangToken.new();
    boomerang = await Boomerang.new(boomerangToken.address);
  });

  it("business should be able to register user reward system", async function() {

    await boomerang.registerUserRewardSystem(businessAddress, rewardSystem.numberOfRewardSteps, rewardSystem.numberOfRewardCyclesForLevel, rewardSystem.numberOfRewardLevels, rewardSystem.levelRewards, ipfsHash);
    const userRewardSystemStruct = await boomerang.getUserRewardSystem(businessAddress);

    Number(userRewardSystemStruct[0]).should.equal(rewardSystem.numberOfRewardSteps);

    for (let i = 0; i < rewardSystem.numberOfRewardCyclesForLevel.length; i++) {
      Number(userRewardSystemStruct[1][i]).should.equal(rewardSystem.numberOfRewardCyclesForLevel[i]);
    }

    Number(userRewardSystemStruct[2]).should.equal(rewardSystem.numberOfRewardLevels);

    for (let i = 0; i < rewardSystem.levelRewards.length; i++) {
      Number(userRewardSystemStruct[3][i]).should.equal(rewardSystem.levelRewards[i]);
    }

    userRewardSystemStruct[4].should.equal(ipfsHash);
  });

  /**/

  it("user should increment one rewardStep after making review", async function() {

    await boomerang.registerUserRewardSystem(businessAddress, rewardSystem.numberOfRewardSteps, rewardSystem.numberOfRewardCyclesForLevel, rewardSystem.numberOfRewardLevels, rewardSystem.levelRewards, ipfsHash);

    await assertUserRewardSystemStatus(boomerang, userAddress, businessAddress, 0, 0, 0, 0);

    const workerRating = 3;
    const businessRating = 3;
    await boomerang.rateExperience(userAddress, workerAddress, businessAddress, workerRating, businessRating, ipfsHash);

    await assertUserRewardSystemStatus(boomerang, userAddress, businessAddress, 1, 0, 0, 0);
  });

  it("user should increment one rewardCycle after completing the numberOfRewardSteps", async function() {

    await assertUserRewardSystemStatus(boomerang, userAddress, businessAddress, 0, 0, 0, 0);

    await boomerang.registerUserRewardSystem(businessAddress, rewardSystem.numberOfRewardSteps, rewardSystem.numberOfRewardCyclesForLevel, rewardSystem.numberOfRewardLevels, rewardSystem.levelRewards, ipfsHash);
    await fillRewardPool(boomerangToken, deployerAddress, businessAddress, boomerang.address);

    await completeOneUserRewardCycle(boomerang, userAddress, workerAddress, businessAddress);

    await assertUserRewardSystemStatus(boomerang, userAddress, businessAddress, 0, 1, 0, 0);
  });

  it("user should increment one rewardLevel after completing the numberOfRewardCyclesForLevel", async function() {

    await assertUserRewardSystemStatus(boomerang, userAddress, businessAddress, 0, 0, 0, 0);

    await boomerang.registerUserRewardSystem(businessAddress, rewardSystem.numberOfRewardSteps, rewardSystem.numberOfRewardCyclesForLevel, rewardSystem.numberOfRewardLevels, rewardSystem.levelRewards, ipfsHash);
    await fillRewardPool(boomerangToken, deployerAddress, businessAddress, boomerang.address);

    for (let i = 0; i < rewardSystem.numberOfRewardCyclesForLevel[0]; i++) {
      await completeOneUserRewardCycle(boomerang, userAddress, workerAddress, businessAddress);
    }

    await assertUserRewardSystemStatus(boomerang, userAddress, businessAddress, 0, 0, 1, 0);
  });

  it("user should increment one rewardRank after completing the numberOfRewardLevels", async function() {

    await assertUserRewardSystemStatus(boomerang, userAddress, businessAddress, 0, 0, 0, 0);

    await boomerang.registerUserRewardSystem(businessAddress, rewardSystem.numberOfRewardSteps, rewardSystem.numberOfRewardCyclesForLevel, rewardSystem.numberOfRewardLevels, rewardSystem.levelRewards, ipfsHash);
    await fillRewardPool(boomerangToken, deployerAddress, businessAddress, boomerang.address);

    for (let i = 0; i < rewardSystem.numberOfRewardLevels; i++) {
      for (let j = 0; j < rewardSystem.numberOfRewardCyclesForLevel[i]; j++) {
        await completeOneUserRewardCycle(boomerang, userAddress, workerAddress, businessAddress);
      }
    }

    await assertUserRewardSystemStatus(boomerang, userAddress, businessAddress, 0, 0, 0, 1);
  });

  /**/

  it("user reward system progress should update appropriately", async function() {

    await assertUserRewardSystemStatus(boomerang, userAddress, businessAddress, 0, 0, 0, 0);

    await boomerang.registerUserRewardSystem(businessAddress, rewardSystem.numberOfRewardSteps, rewardSystem.numberOfRewardCyclesForLevel, rewardSystem.numberOfRewardLevels, rewardSystem.levelRewards, ipfsHash);
    await fillRewardPool(boomerangToken, deployerAddress, businessAddress, boomerang.address);

    for (let rewardRank = 0; rewardRank < 3; rewardRank++) {
      for (let rewardLevel = 0; rewardLevel < rewardSystem.numberOfRewardLevels; rewardLevel++) {
        for (let rewardCycle = 0; rewardCycle < rewardSystem.numberOfRewardCyclesForLevel[rewardLevel]; rewardCycle++) {
          for (let rewardStep = 0; rewardStep < rewardSystem.numberOfRewardSteps; rewardStep++) {

            await assertUserRewardSystemStatus(boomerang, userAddress, businessAddress, rewardStep, rewardCycle, rewardLevel, rewardRank);

            const workerRating = 3;
            const businessRating = 3;
            await boomerang.rateExperience(userAddress, workerAddress, businessAddress, workerRating, businessRating, ipfsHash);
          }
        }
      }
    }
  });

  /**/

  it("user should receive boomerang reward from business after completing one reward cycle", async function() {

    await boomerang.registerUserRewardSystem(businessAddress, rewardSystem.numberOfRewardSteps, rewardSystem.numberOfRewardCyclesForLevel, rewardSystem.numberOfRewardLevels, rewardSystem.levelRewards, ipfsHash);
    await fillRewardPool(boomerangToken, deployerAddress, businessAddress, boomerang.address);

    let balance;
    for (let i = 0; i < rewardSystem.numberOfRewardSteps; i++) {

      balance = await boomerangToken.balanceOf(userAddress);
      Number(balance).should.equal(0);

      const workerRating = 3;
      const businessRating = 3;
      await boomerang.rateExperience(userAddress, workerAddress, businessAddress, workerRating, businessRating, ipfsHash);
    }

    balance = await boomerangToken.balanceOf(userAddress);
    Number(balance).should.equal(rewardSystem.levelRewards[0]);
  });

  it("user should receive appropriate boomerang rewards from business", async function() {

    await boomerang.registerUserRewardSystem(businessAddress, rewardSystem.numberOfRewardSteps, rewardSystem.numberOfRewardCyclesForLevel, rewardSystem.numberOfRewardLevels, rewardSystem.levelRewards, ipfsHash);
    await fillRewardPool(boomerangToken, deployerAddress, businessAddress, boomerang.address);

    let balance = await boomerangToken.balanceOf(userAddress);
    Number(balance).should.equal(0);

    for (let rewardRank = 0; rewardRank < 3; rewardRank++) {
      for (let rewardLevel = 0; rewardLevel < rewardSystem.numberOfRewardLevels; rewardLevel++) {
        for (let rewardCycle = 0; rewardCycle < rewardSystem.numberOfRewardCyclesForLevel[rewardLevel]; rewardCycle++) {


          await completeOneUserRewardCycle(boomerang, userAddress, workerAddress, businessAddress);

          let balance = await boomerangToken.balanceOf(userAddress);
          Number(balance).should.equal(rewardSystem.levelRewards[rewardLevel]);
          await boomerangToken.transfer(deployerAddress, balance, {from: userAddress});
        }
      }
    }
  });
});
