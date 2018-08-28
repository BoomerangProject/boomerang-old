const BigNumber = web3.BigNumber;
import { ipfsHash } from './helpers/mockData';
import Signer from './helpers/signer';
import { getBoomerangAuthContract, getBoomerangUserContract, getBoomerangWorkerContract, getBoomerangBusinessContract, getBoomerangTokenContract, getBoomerangRewardsContract, getBoomerangExperienceContract } from './helpers/contractInstances';

require("chai")
  .use(require("chai-as-promised"))
  .use(require("chai-bignumber")(BigNumber))
  .should();

contract("BoomerangBusinessRatingTests", function([deployerAddress, userAddress, workerAddress, businessAddress]) {

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

  it("reviewing a business should increment the number of ratings", async function() {

    let numberOfBusinessRatings = await boomerangBusinessContract.getNumberOfRatings(businessAddress);
    Number(numberOfBusinessRatings).should.equal(0);

    const workerRating = 2;
    const businessRating = 3;
    let sig = await ratingSigner.getSignature();
    await boomerangExperienceContract.rate(userAddress, workerAddress, businessAddress, workerRating, businessRating, ipfsHash, sig.v, sig.r, sig.s);
    numberOfBusinessRatings = await boomerangBusinessContract.getNumberOfRatings(businessAddress);
    Number(numberOfBusinessRatings).should.equal(1);

    sig = await ratingSigner.getSignature();
    await boomerangExperienceContract.rate(userAddress, workerAddress, businessAddress, workerRating, businessRating, ipfsHash, sig.v, sig.r, sig.s);
    numberOfBusinessRatings = await boomerangBusinessContract.getNumberOfRatings(businessAddress);
    Number(numberOfBusinessRatings).should.equal(2);

    sig = await ratingSigner.getSignature();
    await boomerangExperienceContract.rate(userAddress, workerAddress, businessAddress, workerRating, businessRating, ipfsHash, sig.v, sig.r, sig.s);
    numberOfBusinessRatings = await boomerangBusinessContract.getNumberOfRatings(businessAddress);
    Number(numberOfBusinessRatings).should.equal(3);
  });

  it("the business ratings should sum appropriately", async function() {

    const workerRating = 2;
    const firstBusinessRating = 3;
    const secondBusinessRating = 4;
    const thirdBusinessRating = 4;
    let sig = await ratingSigner.getSignature();
    await boomerangExperienceContract.rate(userAddress, workerAddress, businessAddress, workerRating, firstBusinessRating, ipfsHash, sig.v, sig.r, sig.s);

    let businessRatingsSum = await boomerangBusinessContract.getRatingsSum(businessAddress);
    Number(businessRatingsSum).should.equal(3);

    sig = await ratingSigner.getSignature();
    await boomerangExperienceContract.rate(userAddress, workerAddress, businessAddress, workerRating, secondBusinessRating, ipfsHash, sig.v, sig.r, sig.s);
    businessRatingsSum = await boomerangBusinessContract.getRatingsSum(businessAddress);
    Number(businessRatingsSum).should.equal(7);

    sig = await ratingSigner.getSignature();
    await boomerangExperienceContract.rate(userAddress, workerAddress, businessAddress, workerRating, thirdBusinessRating, ipfsHash, sig.v, sig.r, sig.s);
    businessRatingsSum = await boomerangBusinessContract.getRatingsSum(businessAddress);
    Number(businessRatingsSum).should.equal(11);
  });
});
