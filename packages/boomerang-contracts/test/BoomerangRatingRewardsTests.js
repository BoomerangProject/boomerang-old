import fillRewardPool from './helpers/fillRewardPool';

const BigNumber = web3.BigNumber;
import { ipfsHash } from './helpers/mockData';

require("chai")
  .use(require("chai-as-promised"))
  .use(require("chai-bignumber")(BigNumber))
  .should();

const Boomerang = artifacts.require("Boomerang");
const BoomerangToken = artifacts.require("BoomerangToken");

contract("BoomerangRatingRewardsTests", function([deployerAddress, userAddress, workerAddress, businessAddress]) {

  let boomerang;
  let boomerangToken;

  beforeEach(async function() {

    boomerangToken = await BoomerangToken.new();
    boomerang = await Boomerang.new(boomerangToken.address);
  });

  it("worker should receive appropriate rewards for each rating", async function() {

    const ratingRewardValues = [0, 20, 40, 60, 100];

    await fillRewardPool(boomerangToken, deployerAddress, businessAddress, boomerang.address);
    boomerang.setRatingRewards(businessAddress, ratingRewardValues);

    for (let i = 1; i < ratingRewardValues.length+1; i++) {

      let balance = await boomerangToken.balanceOf(workerAddress);
      Number(balance).should.equal(0);

      const workerRating = i;
      const businessRating = 3;
      await boomerang.rateExperience(userAddress, workerAddress, businessAddress, workerRating, businessRating, ipfsHash);

      balance = await boomerangToken.balanceOf(workerAddress);
      Number(balance).should.equal(ratingRewardValues[workerRating-1]);

      await boomerangToken.transfer(deployerAddress, balance, {from: workerAddress});
    }
  });
});
