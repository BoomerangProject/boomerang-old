const BigNumber = web3.BigNumber;
import { ipfsHash, rewardSystem } from './helpers/mockData';
import assertRewardSystemStatus from './helpers/assertRewardSystemStatus';

require("chai")
  .use(require("chai-as-promised"))
  .use(require("chai-bignumber")(BigNumber))
  .should();

const Kudos = artifacts.require("Kudos");
const KudosToken = artifacts.require("KudosToken");

contract("KudosUserRewardSystemTests", function([deployerAddress, userAddress, workerAddress, businessAddress]) {

  let kudos;
  let kudosToken;
  const tokenUnit = new BigNumber(10 ** 18);

  beforeEach(async function() {

    kudosToken = await KudosToken.new();
    kudos = await Kudos.new(kudosToken.address);
  });

  it("business should be able to register user reward system", async function() {

    await kudos.registerUserRewardSystem(businessAddress, rewardSystem.numberOfRewardSteps, rewardSystem.numberOfRewardCyclesForLevel, rewardSystem.numberOfRewardLevels, rewardSystem.levelRewards, ipfsHash);
    const userRewardSystemStruct = await kudos.getUserRewardSystem(businessAddress);

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

  it("user should increment one rewardStep after making review", async function() {

    await kudos.registerUserRewardSystem(businessAddress, rewardSystem.numberOfRewardSteps, rewardSystem.numberOfRewardCyclesForLevel, rewardSystem.numberOfRewardLevels, rewardSystem.levelRewards, ipfsHash);

    await assertRewardSystemStatus(kudos, userAddress, businessAddress, 0, 0, 0, 0);

    const workerRating = 3;
    const businessRating = 3;
    await kudos.rateExperience(userAddress, workerAddress, businessAddress, workerRating, businessRating, ipfsHash);

    await assertRewardSystemStatus(kudos, userAddress, businessAddress, 1, 0, 0, 0);
  });

  it("user should increment one rewardCycle after completing the numberOfRewardSteps", async function() {

    await assertRewardSystemStatus(kudos, userAddress, businessAddress, 0, 0, 0, 0);

    await kudos.registerUserRewardSystem(businessAddress, rewardSystem.numberOfRewardSteps, rewardSystem.numberOfRewardCyclesForLevel, rewardSystem.numberOfRewardLevels, rewardSystem.levelRewards, ipfsHash);
    await kudosToken.transfer(businessAddress, 10000*tokenUnit, {from: deployerAddress});
    await kudosToken.approve(kudos.address, 10000*tokenUnit, {from: businessAddress});

    for (let i = 0; i < rewardSystem.numberOfRewardSteps; i++) {
      const workerRating = 3;
      const businessRating = 3;
      await kudos.rateExperience(userAddress, workerAddress, businessAddress, workerRating, businessRating, ipfsHash);
    }

    await assertRewardSystemStatus(kudos, userAddress, businessAddress, 0, 1, 0, 0);
  });

  it("user should increment one rewardLevel after completing the numberOfRewardCyclesForLevel", async function() {

    await assertRewardSystemStatus(kudos, userAddress, businessAddress, 0, 0, 0, 0);

    await kudos.registerUserRewardSystem(businessAddress, rewardSystem.numberOfRewardSteps, rewardSystem.numberOfRewardCyclesForLevel, rewardSystem.numberOfRewardLevels, rewardSystem.levelRewards, ipfsHash);
    await kudosToken.transfer(businessAddress, 10000*tokenUnit, {from: deployerAddress});
    await kudosToken.approve(kudos.address, 10000*tokenUnit, {from: businessAddress});

    for (let i = 0; i < rewardSystem.numberOfRewardCyclesForLevel[0]; i++) {
      for (let j = 0; j < rewardSystem.numberOfRewardSteps; j++) {
        const workerRating = 3;
        const businessRating = 3;
        await kudos.rateExperience(userAddress, workerAddress, businessAddress, workerRating, businessRating, ipfsHash);
      }
    }

    await assertRewardSystemStatus(kudos, userAddress, businessAddress, 0, 0, 1, 0);
  });

  it("user should increment one rewardRank after completing the numberOfRewardLevels", async function() {

    await assertRewardSystemStatus(kudos, userAddress, businessAddress, 0, 0, 0, 0);

    await kudos.registerUserRewardSystem(businessAddress, rewardSystem.numberOfRewardSteps, rewardSystem.numberOfRewardCyclesForLevel, rewardSystem.numberOfRewardLevels, rewardSystem.levelRewards, ipfsHash);
    await kudosToken.transfer(businessAddress, 10000*tokenUnit, {from: deployerAddress});
    await kudosToken.approve(kudos.address, 10000*tokenUnit, {from: businessAddress});

    for (let i = 0; i < rewardSystem.numberOfRewardLevels; i++) {
      for (let j = 0; j < rewardSystem.numberOfRewardCyclesForLevel[i]; j++) {
        for (let k = 0; k < rewardSystem.numberOfRewardSteps; k++) {
          const workerRating = 3;
          const businessRating = 3;
          await kudos.rateExperience(userAddress, workerAddress, businessAddress, workerRating, businessRating, ipfsHash);
        }
      }
    }

    await assertRewardSystemStatus(kudos, userAddress, businessAddress, 0, 0, 0, 1);
  });

  it("user reward system progress should update appropriately", async function() {

    await assertRewardSystemStatus(kudos, userAddress, businessAddress, 0, 0, 0, 0);

    await kudos.registerUserRewardSystem(businessAddress, rewardSystem.numberOfRewardSteps, rewardSystem.numberOfRewardCyclesForLevel, rewardSystem.numberOfRewardLevels, rewardSystem.levelRewards, ipfsHash);
    await kudosToken.transfer(businessAddress, 10000*tokenUnit, {from: deployerAddress});
    await kudosToken.approve(kudos.address, 10000*tokenUnit, {from: businessAddress});

    for (let rewardRank = 0; rewardRank < 3; rewardRank++) {
      for (let rewardLevel = 0; rewardLevel < rewardSystem.numberOfRewardLevels; rewardLevel++) {
        for (let rewardCycle = 0; rewardCycle < rewardSystem.numberOfRewardCyclesForLevel[rewardLevel]; rewardCycle++) {
          for (let rewardStep = 0; rewardStep < rewardSystem.numberOfRewardSteps; rewardStep++) {

            await assertRewardSystemStatus(kudos, userAddress, businessAddress, rewardStep, rewardCycle, rewardLevel, rewardRank);

            const workerRating = 3;
            const businessRating = 3;
            await kudos.rateExperience(userAddress, workerAddress, businessAddress, workerRating, businessRating, ipfsHash);
          }
        }
      }
    }
  });

  it("user should receive kudos reward from business after completing one reward cycle", async function() {

    await kudos.registerUserRewardSystem(businessAddress, rewardSystem.numberOfRewardSteps, rewardSystem.numberOfRewardCyclesForLevel, rewardSystem.numberOfRewardLevels, rewardSystem.levelRewards, ipfsHash);
    await kudosToken.transfer(businessAddress, 10000*tokenUnit, {from: deployerAddress});
    await kudosToken.approve(kudos.address, 10000*tokenUnit, {from: businessAddress});

    let balance;
    for (let i = 0; i < rewardSystem.numberOfRewardSteps; i++) {

      balance = await kudosToken.balanceOf(userAddress);
      Number(balance).should.equal(0);

      const workerRating = 3;
      const businessRating = 3;
      await kudos.rateExperience(userAddress, workerAddress, businessAddress, workerRating, businessRating, ipfsHash);
    }

    balance = await kudosToken.balanceOf(userAddress);
    Number(balance).should.equal(rewardSystem.levelRewards[0]);
  });

  it("user should receive appropriate kudos rewards from business", async function() {

    await kudos.registerUserRewardSystem(businessAddress, rewardSystem.numberOfRewardSteps, rewardSystem.numberOfRewardCyclesForLevel, rewardSystem.numberOfRewardLevels, rewardSystem.levelRewards, ipfsHash);
    await kudosToken.transfer(businessAddress, 10000*tokenUnit, {from: deployerAddress});
    await kudosToken.approve(kudos.address, 10000*tokenUnit, {from: businessAddress});

    let balance = await kudosToken.balanceOf(userAddress);
    Number(balance).should.equal(0);

    for (let rewardRank = 0; rewardRank < 3; rewardRank++) {
      for (let rewardLevel = 0; rewardLevel < rewardSystem.numberOfRewardLevels; rewardLevel++) {
        for (let rewardCycle = 0; rewardCycle < rewardSystem.numberOfRewardCyclesForLevel[rewardLevel]; rewardCycle++) {
          for (let rewardStep = 0; rewardStep < rewardSystem.numberOfRewardSteps; rewardStep++) {

            const workerRating = 3;
            const businessRating = 3;
            await kudos.rateExperience(userAddress, workerAddress, businessAddress, workerRating, businessRating, ipfsHash);
          }

          let balance = await kudosToken.balanceOf(userAddress);
          Number(balance).should.equal(rewardSystem.levelRewards[rewardLevel]);
          await kudosToken.transfer(deployerAddress, balance, {from: userAddress});
        }
      }
    }
  });
});
