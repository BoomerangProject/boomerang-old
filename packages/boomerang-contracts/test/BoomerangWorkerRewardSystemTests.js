
const BigNumber = web3.BigNumber;
import { ipfsHash, rewardSystem } from './helpers/mockData';
import fillRewardPool from './helpers/fillRewardPool';
import completeOneWorkerRewardCycle from './helpers/completeOneWorkerRewardCycle';
import assertWorkerRewardSystemStatus from './helpers/assertWorkerRewardSystemStatus';
import Signer from './helpers/signer';
import { getBoomerangAuthContract, getBoomerangUserContract, getBoomerangWorkerContract, getBoomerangBusinessContract, getBoomerangTokenContract, getBoomerangRewardsContract, getBoomerangExperienceContract } from './helpers/contractInstances';

require("chai")
  .use(require("chai-as-promised"))
  .use(require("chai-bignumber")(BigNumber))
  .should();

contract("BoomerangWorkerRewardSystemTests", function([deployerAddress, userAddress, workerAddress, businessAddress]) {

  let boomerangAuthContract;
  let boomerangWorkerContract;
  let boomerangBusinessContract;
  let boomerangTokenContract;
  let boomerangRewardsContract;
  let boomerangExperienceContract;
  let ratingSigner;
  let businessSigner;

  beforeEach(async function() {

    boomerangAuthContract = await getBoomerangAuthContract();
    boomerangWorkerContract = await getBoomerangWorkerContract(boomerangAuthContract.address);
    boomerangBusinessContract = await getBoomerangBusinessContract(boomerangAuthContract.address);
    boomerangTokenContract = await getBoomerangTokenContract();
    boomerangRewardsContract = await getBoomerangRewardsContract(boomerangAuthContract.address, boomerangTokenContract.address);
    boomerangExperienceContract = await getBoomerangExperienceContract(boomerangWorkerContract.address, boomerangBusinessContract.address, boomerangRewardsContract.address);

    ratingSigner = await new Signer(userAddress);
    businessSigner = await new Signer(businessAddress);
  });

  it("business should be able to register worker reward system", async function() {

    let sig = await businessSigner.getSignature();
    await boomerangRewardsContract.registerWorkerRewardSystem(businessAddress, rewardSystem.numberOfRewardSteps, rewardSystem.numberOfRewardCyclesForLevel, rewardSystem.numberOfRewardLevels, rewardSystem.levelRewards, ipfsHash, sig.v, sig.r, sig.s);
    const workerRewardSystemStruct = await boomerangRewardsContract.getWorkerRewardSystem(businessAddress);

    Number(workerRewardSystemStruct[0]).should.equal(rewardSystem.numberOfRewardSteps);

    for (let i = 0; i < rewardSystem.numberOfRewardCyclesForLevel.length; i++) {
      Number(workerRewardSystemStruct[1][i]).should.equal(rewardSystem.numberOfRewardCyclesForLevel[i]);
    }

    Number(workerRewardSystemStruct[2]).should.equal(rewardSystem.numberOfRewardLevels);

    for (let i = 0; i < rewardSystem.levelRewards.length; i++) {
      Number(workerRewardSystemStruct[3][i]).should.equal(rewardSystem.levelRewards[i]);
    }

    workerRewardSystemStruct[4].should.equal(ipfsHash, sig.v, sig.r, sig.s);
  });

  /**/

  it("worker should increment one rewardStep after making review", async function() {

    let sig = await businessSigner.getSignature();
    await boomerangRewardsContract.registerWorkerRewardSystem(businessAddress, rewardSystem.numberOfRewardSteps, rewardSystem.numberOfRewardCyclesForLevel, rewardSystem.numberOfRewardLevels, rewardSystem.levelRewards, ipfsHash, sig.v, sig.r, sig.s);

    await assertWorkerRewardSystemStatus(boomerangRewardsContract, workerAddress, businessAddress, 0, 0, 0, 0);

    const workerRating = 5;
    const businessRating = 3;
    sig = await ratingSigner.getSignature();
    await boomerangExperienceContract.rate(userAddress, workerAddress, businessAddress, workerRating, businessRating, ipfsHash, sig.v, sig.r, sig.s);

    await assertWorkerRewardSystemStatus(boomerangRewardsContract, workerAddress, businessAddress, 1, 0, 0, 0);
  });

  it("worker should increment one rewardCycle after completing the numberOfRewardSteps", async function() {

    await assertWorkerRewardSystemStatus(boomerangRewardsContract, workerAddress, businessAddress, 0, 0, 0, 0);

    let sig = await businessSigner.getSignature();
    await boomerangRewardsContract.registerWorkerRewardSystem(businessAddress, rewardSystem.numberOfRewardSteps, rewardSystem.numberOfRewardCyclesForLevel, rewardSystem.numberOfRewardLevels, rewardSystem.levelRewards, ipfsHash, sig.v, sig.r, sig.s);
    await fillRewardPool(boomerangTokenContract, deployerAddress, businessAddress, boomerangRewardsContract.address);

    await completeOneWorkerRewardCycle(boomerangExperienceContract, ratingSigner, userAddress, workerAddress, businessAddress);
    
    await assertWorkerRewardSystemStatus(boomerangRewardsContract, workerAddress, businessAddress, 0, 1, 0, 0);
  });

  it("worker should increment one rewardLevel after completing the numberOfRewardCyclesForLevel", async function() {

    await assertWorkerRewardSystemStatus(boomerangRewardsContract, workerAddress, businessAddress, 0, 0, 0, 0);

    let sig = await businessSigner.getSignature();
    await boomerangRewardsContract.registerWorkerRewardSystem(businessAddress, rewardSystem.numberOfRewardSteps, rewardSystem.numberOfRewardCyclesForLevel, rewardSystem.numberOfRewardLevels, rewardSystem.levelRewards, ipfsHash, sig.v, sig.r, sig.s);
    await fillRewardPool(boomerangTokenContract, deployerAddress, businessAddress, boomerangRewardsContract.address);

    for (let i = 0; i < rewardSystem.numberOfRewardCyclesForLevel[0]; i++) {
      await completeOneWorkerRewardCycle(boomerangExperienceContract, ratingSigner, userAddress, workerAddress, businessAddress);
    }

    await assertWorkerRewardSystemStatus(boomerangRewardsContract, workerAddress, businessAddress, 0, 0, 1, 0);
  });

  it("worker should increment one rewardRank after completing the numberOfRewardLevels", async function() {

    await assertWorkerRewardSystemStatus(boomerangRewardsContract, workerAddress, businessAddress, 0, 0, 0, 0);

    let sig = await businessSigner.getSignature();
    await boomerangRewardsContract.registerWorkerRewardSystem(businessAddress, rewardSystem.numberOfRewardSteps, rewardSystem.numberOfRewardCyclesForLevel, rewardSystem.numberOfRewardLevels, rewardSystem.levelRewards, ipfsHash, sig.v, sig.r, sig.s);
    await fillRewardPool(boomerangTokenContract, deployerAddress, businessAddress, boomerangRewardsContract.address);

    for (let i = 0; i < rewardSystem.numberOfRewardLevels; i++) {
      for (let j = 0; j < rewardSystem.numberOfRewardCyclesForLevel[i]; j++) {
        await completeOneWorkerRewardCycle(boomerangExperienceContract, ratingSigner, userAddress, workerAddress, businessAddress);
      }
    }

    await assertWorkerRewardSystemStatus(boomerangRewardsContract, workerAddress, businessAddress, 0, 0, 0, 1);
  });

  /**/

  it("worker reward system progress should update appropriately", async function() {

    await assertWorkerRewardSystemStatus(boomerangRewardsContract, workerAddress, businessAddress, 0, 0, 0, 0);

    let sig = await businessSigner.getSignature();
    await boomerangRewardsContract.registerWorkerRewardSystem(businessAddress, rewardSystem.numberOfRewardSteps, rewardSystem.numberOfRewardCyclesForLevel, rewardSystem.numberOfRewardLevels, rewardSystem.levelRewards, ipfsHash, sig.v, sig.r, sig.s);
    await fillRewardPool(boomerangTokenContract, deployerAddress, businessAddress, boomerangRewardsContract.address);

    for (let rewardRank = 0; rewardRank < 3; rewardRank++) {
      for (let rewardLevel = 0; rewardLevel < rewardSystem.numberOfRewardLevels; rewardLevel++) {
        for (let rewardCycle = 0; rewardCycle < rewardSystem.numberOfRewardCyclesForLevel[rewardLevel]; rewardCycle++) {
          for (let rewardStep = 0; rewardStep < rewardSystem.numberOfRewardSteps; rewardStep++) {

            await assertWorkerRewardSystemStatus(boomerangRewardsContract, workerAddress, businessAddress, rewardStep, rewardCycle, rewardLevel, rewardRank);

            const workerRating = 5;
            const businessRating = 3;
            sig = await ratingSigner.getSignature();
            await boomerangExperienceContract.rate(userAddress, workerAddress, businessAddress, workerRating, businessRating, ipfsHash, sig.v, sig.r, sig.s);
          }
        }
      }
    }
  });

  /**/

  it("worker should receive boomerang reward from business after completing one reward cycle", async function() {

    let sig = await businessSigner.getSignature();
    await boomerangRewardsContract.registerWorkerRewardSystem(businessAddress, rewardSystem.numberOfRewardSteps, rewardSystem.numberOfRewardCyclesForLevel, rewardSystem.numberOfRewardLevels, rewardSystem.levelRewards, ipfsHash, sig.v, sig.r, sig.s);
    await fillRewardPool(boomerangTokenContract, deployerAddress, businessAddress, boomerangRewardsContract.address);

    let balance;
    for (let i = 0; i < rewardSystem.numberOfRewardSteps; i++) {

      balance = await boomerangTokenContract.balanceOf(workerAddress);
      Number(balance).should.equal(0);

      const workerRating = 5;
      const businessRating = 3;
      sig = await ratingSigner.getSignature();
      await boomerangExperienceContract.rate(userAddress, workerAddress, businessAddress, workerRating, businessRating, ipfsHash, sig.v, sig.r, sig.s);
    }

    balance = await boomerangTokenContract.balanceOf(workerAddress);
    Number(balance).should.equal(rewardSystem.levelRewards[0]);
  });

  it("worker should receive appropriate boomerang rewards from business", async function() {

    let sig = await businessSigner.getSignature();
    await boomerangRewardsContract.registerWorkerRewardSystem(businessAddress, rewardSystem.numberOfRewardSteps, rewardSystem.numberOfRewardCyclesForLevel, rewardSystem.numberOfRewardLevels, rewardSystem.levelRewards, ipfsHash, sig.v, sig.r, sig.s);
    await fillRewardPool(boomerangTokenContract, deployerAddress, businessAddress, boomerangRewardsContract.address);

    let balance = await boomerangTokenContract.balanceOf(workerAddress);
    Number(balance).should.equal(0);

    for (let rewardRank = 0; rewardRank < 3; rewardRank++) {
      for (let rewardLevel = 0; rewardLevel < rewardSystem.numberOfRewardLevels; rewardLevel++) {
        for (let rewardCycle = 0; rewardCycle < rewardSystem.numberOfRewardCyclesForLevel[rewardLevel]; rewardCycle++) {
          await completeOneWorkerRewardCycle(boomerangExperienceContract, ratingSigner, userAddress, workerAddress, businessAddress);

          let balance = await boomerangTokenContract.balanceOf(workerAddress);
          Number(balance).should.equal(rewardSystem.levelRewards[rewardLevel]);
          await boomerangTokenContract.transfer(deployerAddress, balance, {from: workerAddress});
        }
      }
    }
  });
});
