
const BigNumber = web3.BigNumber;
import { ipfsHash, rewardSystem } from './helpers/mockData';
import fillRewardPool from './helpers/fillRewardPool';
import completeOneWorkerRewardCycle from './helpers/completeOneWorkerRewardCycle';
import assertWorkerRewardSystemStatus from './helpers/assertWorkerRewardSystemStatus';

require("chai")
  .use(require("chai-as-promised"))
  .use(require("chai-bignumber")(BigNumber))
  .should();

const Boomerang = artifacts.require("Boomerang");
const BoomerangToken = artifacts.require("BoomerangToken");

contract("BoomerangWorkerRewardSystemTests", function([deployerAddress, userAddress, workerAddress, businessAddress]) {

  let boomerang;
  let boomerangToken;

  beforeEach(async function() {

    boomerangToken = await BoomerangToken.new();
    boomerang = await Boomerang.new(boomerangToken.address);
  });

  it("business should be able to register worker reward system", async function() {

    await boomerang.registerWorkerRewardSystem(businessAddress, rewardSystem.numberOfRewardSteps, rewardSystem.numberOfRewardCyclesForLevel, rewardSystem.numberOfRewardLevels, rewardSystem.levelRewards, ipfsHash);
    const workerRewardSystemStruct = await boomerang.getWorkerRewardSystem(businessAddress);

    Number(workerRewardSystemStruct[0]).should.equal(rewardSystem.numberOfRewardSteps);

    for (let i = 0; i < rewardSystem.numberOfRewardCyclesForLevel.length; i++) {
      Number(workerRewardSystemStruct[1][i]).should.equal(rewardSystem.numberOfRewardCyclesForLevel[i]);
    }

    Number(workerRewardSystemStruct[2]).should.equal(rewardSystem.numberOfRewardLevels);

    for (let i = 0; i < rewardSystem.levelRewards.length; i++) {
      Number(workerRewardSystemStruct[3][i]).should.equal(rewardSystem.levelRewards[i]);
    }

    workerRewardSystemStruct[4].should.equal(ipfsHash);
  });

  /**/

  it("worker should increment one rewardStep after making review", async function() {

    await boomerang.registerWorkerRewardSystem(businessAddress, rewardSystem.numberOfRewardSteps, rewardSystem.numberOfRewardCyclesForLevel, rewardSystem.numberOfRewardLevels, rewardSystem.levelRewards, ipfsHash);

    await assertWorkerRewardSystemStatus(boomerang, workerAddress, businessAddress, 0, 0, 0, 0);

    const workerRating = 5;
    const businessRating = 3;
    await boomerang.rateExperience(userAddress, workerAddress, businessAddress, workerRating, businessRating, ipfsHash);

    await assertWorkerRewardSystemStatus(boomerang, workerAddress, businessAddress, 1, 0, 0, 0);
  });

  it("worker should increment one rewardCycle after completing the numberOfRewardSteps", async function() {

    await assertWorkerRewardSystemStatus(boomerang, workerAddress, businessAddress, 0, 0, 0, 0);

    await boomerang.registerWorkerRewardSystem(businessAddress, rewardSystem.numberOfRewardSteps, rewardSystem.numberOfRewardCyclesForLevel, rewardSystem.numberOfRewardLevels, rewardSystem.levelRewards, ipfsHash);
    await fillRewardPool(boomerangToken, deployerAddress, businessAddress, boomerang.address);

    await completeOneWorkerRewardCycle(boomerang, userAddress, workerAddress, businessAddress);
    
    await assertWorkerRewardSystemStatus(boomerang, workerAddress, businessAddress, 0, 1, 0, 0);
  });

  it("worker should increment one rewardLevel after completing the numberOfRewardCyclesForLevel", async function() {

    await assertWorkerRewardSystemStatus(boomerang, workerAddress, businessAddress, 0, 0, 0, 0);

    await boomerang.registerWorkerRewardSystem(businessAddress, rewardSystem.numberOfRewardSteps, rewardSystem.numberOfRewardCyclesForLevel, rewardSystem.numberOfRewardLevels, rewardSystem.levelRewards, ipfsHash);
    await fillRewardPool(boomerangToken, deployerAddress, businessAddress, boomerang.address);

    for (let i = 0; i < rewardSystem.numberOfRewardCyclesForLevel[0]; i++) {
      await completeOneWorkerRewardCycle(boomerang, userAddress, workerAddress, businessAddress);
    }

    await assertWorkerRewardSystemStatus(boomerang, workerAddress, businessAddress, 0, 0, 1, 0);
  });

  it("worker should increment one rewardRank after completing the numberOfRewardLevels", async function() {

    await assertWorkerRewardSystemStatus(boomerang, workerAddress, businessAddress, 0, 0, 0, 0);

    await boomerang.registerWorkerRewardSystem(businessAddress, rewardSystem.numberOfRewardSteps, rewardSystem.numberOfRewardCyclesForLevel, rewardSystem.numberOfRewardLevels, rewardSystem.levelRewards, ipfsHash);
    await fillRewardPool(boomerangToken, deployerAddress, businessAddress, boomerang.address);

    for (let i = 0; i < rewardSystem.numberOfRewardLevels; i++) {
      for (let j = 0; j < rewardSystem.numberOfRewardCyclesForLevel[i]; j++) {
        await completeOneWorkerRewardCycle(boomerang, userAddress, workerAddress, businessAddress);
      }
    }

    await assertWorkerRewardSystemStatus(boomerang, workerAddress, businessAddress, 0, 0, 0, 1);
  });

  /**/

  it("worker reward system progress should update appropriately", async function() {

    await assertWorkerRewardSystemStatus(boomerang, workerAddress, businessAddress, 0, 0, 0, 0);

    await boomerang.registerWorkerRewardSystem(businessAddress, rewardSystem.numberOfRewardSteps, rewardSystem.numberOfRewardCyclesForLevel, rewardSystem.numberOfRewardLevels, rewardSystem.levelRewards, ipfsHash);
    await fillRewardPool(boomerangToken, deployerAddress, businessAddress, boomerang.address);

    for (let rewardRank = 0; rewardRank < 3; rewardRank++) {
      for (let rewardLevel = 0; rewardLevel < rewardSystem.numberOfRewardLevels; rewardLevel++) {
        for (let rewardCycle = 0; rewardCycle < rewardSystem.numberOfRewardCyclesForLevel[rewardLevel]; rewardCycle++) {
          for (let rewardStep = 0; rewardStep < rewardSystem.numberOfRewardSteps; rewardStep++) {

            await assertWorkerRewardSystemStatus(boomerang, workerAddress, businessAddress, rewardStep, rewardCycle, rewardLevel, rewardRank);

            const workerRating = 5;
            const businessRating = 3;
            await boomerang.rateExperience(userAddress, workerAddress, businessAddress, workerRating, businessRating, ipfsHash);
          }
        }
      }
    }
  });

  /**/

  it("worker should receive boomerang reward from business after completing one reward cycle", async function() {

    await boomerang.registerWorkerRewardSystem(businessAddress, rewardSystem.numberOfRewardSteps, rewardSystem.numberOfRewardCyclesForLevel, rewardSystem.numberOfRewardLevels, rewardSystem.levelRewards, ipfsHash);
    await fillRewardPool(boomerangToken, deployerAddress, businessAddress, boomerang.address);

    let balance;
    for (let i = 0; i < rewardSystem.numberOfRewardSteps; i++) {

      balance = await boomerangToken.balanceOf(workerAddress);
      Number(balance).should.equal(0);

      const workerRating = 5;
      const businessRating = 3;
      await boomerang.rateExperience(userAddress, workerAddress, businessAddress, workerRating, businessRating, ipfsHash);
    }

    balance = await boomerangToken.balanceOf(workerAddress);
    Number(balance).should.equal(rewardSystem.levelRewards[0]);
  });

  it("worker should receive appropriate boomerang rewards from business", async function() {

    await boomerang.registerWorkerRewardSystem(businessAddress, rewardSystem.numberOfRewardSteps, rewardSystem.numberOfRewardCyclesForLevel, rewardSystem.numberOfRewardLevels, rewardSystem.levelRewards, ipfsHash);
    await fillRewardPool(boomerangToken, deployerAddress, businessAddress, boomerang.address);

    let balance = await boomerangToken.balanceOf(workerAddress);
    Number(balance).should.equal(0);

    for (let rewardRank = 0; rewardRank < 3; rewardRank++) {
      for (let rewardLevel = 0; rewardLevel < rewardSystem.numberOfRewardLevels; rewardLevel++) {
        for (let rewardCycle = 0; rewardCycle < rewardSystem.numberOfRewardCyclesForLevel[rewardLevel]; rewardCycle++) {
          await completeOneWorkerRewardCycle(boomerang, userAddress, workerAddress, businessAddress);

          let balance = await boomerangToken.balanceOf(workerAddress);
          Number(balance).should.equal(rewardSystem.levelRewards[rewardLevel]);
          await boomerangToken.transfer(deployerAddress, balance, {from: workerAddress});
        }
      }
    }
  });
});
