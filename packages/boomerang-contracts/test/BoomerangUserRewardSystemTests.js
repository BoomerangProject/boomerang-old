
const BigNumber = web3.BigNumber;
import { ipfsHash, rewardSystem } from './helpers/mockData';
import assertUserRewardSystemStatus from './helpers/assertUserRewardSystemStatus';
import fillRewardPool from './helpers/fillRewardPool';
import completeOneUserRewardCycle from './helpers/completeOneUserRewardCycle';
import Signer from './helpers/signer';
import { getBoomerangAuthContract, getBoomerangUserContract, getBoomerangWorkerContract, getBoomerangBusinessContract, getBoomerangTokenContract, getBoomerangRewardsContract, getBoomerangExperienceContract } from './helpers/contractInstances';

require("chai")
  .use(require("chai-as-promised"))
  .use(require("chai-bignumber")(BigNumber))
  .should();

contract("BoomerangUserRewardSystemTests", function([deployerAddress, userAddress, workerAddress, businessAddress]) {

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

  it("business should be able to register user reward system", async function() {

    let sig = await businessSigner.getSignature();
    await boomerangRewardsContract.registerUserRewardSystem(businessAddress, rewardSystem.numberOfRewardSteps, rewardSystem.numberOfRewardCyclesForLevel, rewardSystem.numberOfRewardLevels, rewardSystem.levelRewards, ipfsHash, sig.v, sig.r, sig.s);
    const userRewardSystemStruct = await boomerangRewardsContract.getUserRewardSystem(businessAddress);

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

    let sig = await businessSigner.getSignature();
    await boomerangRewardsContract.registerUserRewardSystem(businessAddress, rewardSystem.numberOfRewardSteps, rewardSystem.numberOfRewardCyclesForLevel, rewardSystem.numberOfRewardLevels, rewardSystem.levelRewards, ipfsHash, sig.v, sig.r, sig.s);

    await assertUserRewardSystemStatus(boomerangRewardsContract, userAddress, businessAddress, 0, 0, 0, 0);

    const workerRating = 3;
    const businessRating = 3;
    sig = await ratingSigner.getSignature();
    await boomerangExperienceContract.rate(userAddress, workerAddress, businessAddress, workerRating, businessRating, ipfsHash, sig.v, sig.r, sig.s);

    await assertUserRewardSystemStatus(boomerangRewardsContract, userAddress, businessAddress, 1, 0, 0, 0);
  });

  it("user should increment one rewardCycle after completing the numberOfRewardSteps", async function() {

    await assertUserRewardSystemStatus(boomerangRewardsContract, userAddress, businessAddress, 0, 0, 0, 0);

    let sig = await businessSigner.getSignature();
    await boomerangRewardsContract.registerUserRewardSystem(businessAddress, rewardSystem.numberOfRewardSteps, rewardSystem.numberOfRewardCyclesForLevel, rewardSystem.numberOfRewardLevels, rewardSystem.levelRewards, ipfsHash, sig.v, sig.r, sig.s);
    await fillRewardPool(boomerangTokenContract, deployerAddress, businessAddress, boomerangRewardsContract.address);

    await completeOneUserRewardCycle(boomerangExperienceContract, ratingSigner, userAddress, workerAddress, businessAddress);

    await assertUserRewardSystemStatus(boomerangRewardsContract, userAddress, businessAddress, 0, 1, 0, 0);
  });

  it("user should increment one rewardLevel after completing the numberOfRewardCyclesForLevel", async function() {

    await assertUserRewardSystemStatus(boomerangRewardsContract, userAddress, businessAddress, 0, 0, 0, 0);

    let sig = await businessSigner.getSignature();
    await boomerangRewardsContract.registerUserRewardSystem(businessAddress, rewardSystem.numberOfRewardSteps, rewardSystem.numberOfRewardCyclesForLevel, rewardSystem.numberOfRewardLevels, rewardSystem.levelRewards, ipfsHash, sig.v, sig.r, sig.s);
    await fillRewardPool(boomerangTokenContract, deployerAddress, businessAddress, boomerangRewardsContract.address);

    for (let i = 0; i < rewardSystem.numberOfRewardCyclesForLevel[0]; i++) {
      await completeOneUserRewardCycle(boomerangExperienceContract, ratingSigner, userAddress, workerAddress, businessAddress);
    }

    await assertUserRewardSystemStatus(boomerangRewardsContract, userAddress, businessAddress, 0, 0, 1, 0);
  });

  it("user should increment one rewardRank after completing the numberOfRewardLevels", async function() {

    await assertUserRewardSystemStatus(boomerangRewardsContract, userAddress, businessAddress, 0, 0, 0, 0);

    let sig = await businessSigner.getSignature();
    await boomerangRewardsContract.registerUserRewardSystem(businessAddress, rewardSystem.numberOfRewardSteps, rewardSystem.numberOfRewardCyclesForLevel, rewardSystem.numberOfRewardLevels, rewardSystem.levelRewards, ipfsHash, sig.v, sig.r, sig.s);
    await fillRewardPool(boomerangTokenContract, deployerAddress, businessAddress, boomerangRewardsContract.address);

    for (let i = 0; i < rewardSystem.numberOfRewardLevels; i++) {
      for (let j = 0; j < rewardSystem.numberOfRewardCyclesForLevel[i]; j++) {
        await completeOneUserRewardCycle(boomerangExperienceContract, ratingSigner, userAddress, workerAddress, businessAddress);
      }
    }

    await assertUserRewardSystemStatus(boomerangRewardsContract, userAddress, businessAddress, 0, 0, 0, 1);
  });

  /**/

  it("user reward system progress should update appropriately", async function() {

    await assertUserRewardSystemStatus(boomerangRewardsContract, userAddress, businessAddress, 0, 0, 0, 0);

    let sig = await businessSigner.getSignature();
    await boomerangRewardsContract.registerUserRewardSystem(businessAddress, rewardSystem.numberOfRewardSteps, rewardSystem.numberOfRewardCyclesForLevel, rewardSystem.numberOfRewardLevels, rewardSystem.levelRewards, ipfsHash, sig.v, sig.r, sig.s);
    await fillRewardPool(boomerangTokenContract, deployerAddress, businessAddress, boomerangRewardsContract.address);

    for (let rewardRank = 0; rewardRank < 3; rewardRank++) {
      for (let rewardLevel = 0; rewardLevel < rewardSystem.numberOfRewardLevels; rewardLevel++) {
        for (let rewardCycle = 0; rewardCycle < rewardSystem.numberOfRewardCyclesForLevel[rewardLevel]; rewardCycle++) {
          for (let rewardStep = 0; rewardStep < rewardSystem.numberOfRewardSteps; rewardStep++) {

            await assertUserRewardSystemStatus(boomerangRewardsContract, userAddress, businessAddress, rewardStep, rewardCycle, rewardLevel, rewardRank);

            const workerRating = 3;
            const businessRating = 3;
            let sig = await ratingSigner.getSignature();
            await boomerangExperienceContract.rate(userAddress, workerAddress, businessAddress, workerRating, businessRating, ipfsHash, sig.v, sig.r, sig.s);
          }
        }
      }
    }
  });

  /**/

  it("user should receive boomerang reward from business after completing one reward cycle", async function() {

    let sig = await businessSigner.getSignature();
    await boomerangRewardsContract.registerUserRewardSystem(businessAddress, rewardSystem.numberOfRewardSteps, rewardSystem.numberOfRewardCyclesForLevel, rewardSystem.numberOfRewardLevels, rewardSystem.levelRewards, ipfsHash, sig.v, sig.r, sig.s);
    await fillRewardPool(boomerangTokenContract, deployerAddress, businessAddress, boomerangRewardsContract.address);

    let balance;
    for (let i = 0; i < rewardSystem.numberOfRewardSteps; i++) {

      balance = await boomerangTokenContract.balanceOf(userAddress);
      Number(balance).should.equal(0);

      const workerRating = 3;
      const businessRating = 3;
      let sig = await ratingSigner.getSignature();
      await boomerangExperienceContract.rate(userAddress, workerAddress, businessAddress, workerRating, businessRating, ipfsHash, sig.v, sig.r, sig.s);
    }

    balance = await boomerangTokenContract.balanceOf(userAddress);
    Number(balance).should.equal(rewardSystem.levelRewards[0]);
  });

  it("user should receive appropriate boomerang rewards from business", async function() {

    let sig = await businessSigner.getSignature();
    await boomerangRewardsContract.registerUserRewardSystem(businessAddress, rewardSystem.numberOfRewardSteps, rewardSystem.numberOfRewardCyclesForLevel, rewardSystem.numberOfRewardLevels, rewardSystem.levelRewards, ipfsHash, sig.v, sig.r, sig.s);
    await fillRewardPool(boomerangTokenContract, deployerAddress, businessAddress, boomerangRewardsContract.address);

    let balance = await boomerangTokenContract.balanceOf(userAddress);
    Number(balance).should.equal(0);

    for (let rewardRank = 0; rewardRank < 3; rewardRank++) {
      for (let rewardLevel = 0; rewardLevel < rewardSystem.numberOfRewardLevels; rewardLevel++) {
        for (let rewardCycle = 0; rewardCycle < rewardSystem.numberOfRewardCyclesForLevel[rewardLevel]; rewardCycle++) {


          await completeOneUserRewardCycle(boomerangExperienceContract, ratingSigner, userAddress, workerAddress, businessAddress);

          let balance = await boomerangTokenContract.balanceOf(userAddress);
          Number(balance).should.equal(rewardSystem.levelRewards[rewardLevel]);
          await boomerangTokenContract.transfer(deployerAddress, balance, {from: userAddress});
        }
      }
    }
  });
});
