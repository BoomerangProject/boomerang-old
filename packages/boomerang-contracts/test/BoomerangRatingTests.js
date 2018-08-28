const BigNumber = web3.BigNumber;
import printEvents from './helpers/printEvents';
import { ipfsHash } from './helpers/mockData';
import Signer from './helpers/signer';
import { getBoomerangAuthContract, getBoomerangUserContract, getBoomerangWorkerContract, getBoomerangBusinessContract, getBoomerangTokenContract, getBoomerangRewardsContract, getBoomerangExperienceContract } from './helpers/contractInstances';

require("chai")
  .use(require("chai-as-promised"))
  .use(require("chai-bignumber")(BigNumber))
  .should();

contract("BoomerangRatingTests", function([deployerAddress, userAddress, workerAddress, businessAddress]) {

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

  it("a user with the correct signature should be able to review a business", async function() {

    let numberOfBusinessRatings = await boomerangBusinessContract.getNumberOfRatings(businessAddress);
    Number(numberOfBusinessRatings).should.equal(0);

    let sig = await ratingSigner.getSignature();
    let workerRating = 3;
    let businessRating = 3;
    await boomerangExperienceContract.rate(userAddress, workerAddress, businessAddress, workerRating, businessRating, ipfsHash, sig.v, sig.r, sig.s);

    numberOfBusinessRatings = await boomerangBusinessContract.getNumberOfRatings(businessAddress);
    Number(numberOfBusinessRatings).should.equal(1);
  });

  it("a user with an incorrect signature should not be able to review a business", async function() {

    let sig = await ratingSigner.getSignature();
    let workerRating = 3;
    let businessRating = 3;
    await boomerangExperienceContract.rate(userAddress, workerAddress, businessAddress, workerRating, businessRating, ipfsHash, sig.v, sig.s, sig.s).should.be.rejected;
  });
});