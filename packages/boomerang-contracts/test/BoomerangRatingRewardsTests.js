const BigNumber = web3.BigNumber;
import fillRewardPool from './helpers/fillRewardPool';
import { ipfsHash } from './helpers/mockData';
import Signer from './helpers/signer';
import { getBoomerangAuthContract, getBoomerangUserContract, getBoomerangWorkerContract, getBoomerangBusinessContract, getBoomerangTokenContract, getBoomerangRewardsContract, getBoomerangExperienceContract } from './helpers/contractInstances';

require("chai")
  .use(require("chai-as-promised"))
  .use(require("chai-bignumber")(BigNumber))
  .should();

contract("BoomerangRatingRewardsTests", function([deployerAddress, userAddress, workerAddress, businessAddress]) {

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

  it("worker should receive appropriate rewards for each rating", async function() {

    const ratingRewardValues = [0, 20, 40, 60, 100];
    let sig = await businessSigner.getSignature();
    await boomerangRewardsContract.setRatingRewards(businessAddress, ratingRewardValues, sig.v, sig.r, sig.s);

    await fillRewardPool(boomerangTokenContract, deployerAddress, businessAddress, boomerangRewardsContract.address);

    let balance = await boomerangTokenContract.balanceOf(workerAddress);
    Number(balance).should.equal(0);

    for (let i = 1; i < ratingRewardValues.length+1; i++) {

      let balance = await boomerangTokenContract.balanceOf(workerAddress);
      Number(balance).should.equal(0);

      const workerRating = i;
      const businessRating = 3;
      let sig = await ratingSigner.getSignature();
      await boomerangExperienceContract.rate(userAddress, workerAddress, businessAddress, workerRating, businessRating, ipfsHash, sig.v, sig.r, sig.s);

      balance = await boomerangTokenContract.balanceOf(workerAddress);
      Number(balance).should.equal(ratingRewardValues[workerRating-1]);

      await boomerangTokenContract.transfer(deployerAddress, balance, {from: workerAddress});
    }
  });
});
