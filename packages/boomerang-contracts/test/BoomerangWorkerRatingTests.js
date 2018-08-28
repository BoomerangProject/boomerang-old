import assertWorkerRewardSystemStatus from './helpers/assertWorkerRewardSystemStatus';

const BigNumber = web3.BigNumber;
import { ipfsHash, rewardSystem } from './helpers/mockData';
import Signer from './helpers/signer';
import { getBoomerangAuthContract, getBoomerangUserContract, getBoomerangWorkerContract, getBoomerangBusinessContract, getBoomerangTokenContract, getBoomerangRewardsContract, getBoomerangExperienceContract } from './helpers/contractInstances';


require("chai")
  .use(require("chai-as-promised"))
  .use(require("chai-bignumber")(BigNumber))
  .should();

contract("BoomerangWorkerRatingTests", function([deployerAddress, userAddress, workerAddress, businessAddress]) {

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

  it("reviewing a worker should add a rating", async function() {

    let workerRatingsSum = await boomerangWorkerContract.getRatingsSum(workerAddress, businessAddress);
    Number(workerRatingsSum).should.equal(0);

    const workerRating = 2;
    const businessRating = 3;
    let sig = await ratingSigner.getSignature();
    await boomerangExperienceContract.rate(userAddress, workerAddress, businessAddress, workerRating, businessRating, ipfsHash, sig.v, sig.r, sig.s);

    workerRatingsSum = await boomerangWorkerContract.getRatingsSum(workerAddress, businessAddress);
    Number(workerRatingsSum).should.equal(2);
  });

  it("reviewing a worker should increment the number of ratings", async function() {

    let numberOfWorkerRatings = await boomerangWorkerContract.getNumberOfRatings(workerAddress, businessAddress);
    Number(numberOfWorkerRatings).should.equal(0);

    const workerRating = 2;
    const businessRating = 3;
    let sig = await ratingSigner.getSignature();
    await boomerangExperienceContract.rate(userAddress, workerAddress, businessAddress, workerRating, businessRating, ipfsHash, sig.v, sig.r, sig.s);
    numberOfWorkerRatings = await boomerangWorkerContract.getNumberOfRatings(workerAddress, businessAddress);
    Number(numberOfWorkerRatings).should.equal(1);

    sig = await ratingSigner.getSignature();
    await boomerangExperienceContract.rate(userAddress, workerAddress, businessAddress, workerRating, businessRating, ipfsHash, sig.v, sig.r, sig.s);
    numberOfWorkerRatings = await boomerangWorkerContract.getNumberOfRatings(workerAddress, businessAddress);
    Number(numberOfWorkerRatings).should.equal(2);
  });

  it("the worker ratings should sum appropriately", async function() {

    const firstWorkerRating = 2;
    const secondWorkerRating = 4;
    const thirdWorkerRating = 4;
    const businessRating = 3;

    let sig = await ratingSigner.getSignature();
    await boomerangExperienceContract.rate(userAddress, workerAddress, businessAddress, firstWorkerRating, businessRating, ipfsHash, sig.v, sig.r, sig.s);

    let workerRatingsSum = await boomerangWorkerContract.getRatingsSum(workerAddress, businessAddress);
    Number(workerRatingsSum).should.equal(2);

    sig = await ratingSigner.getSignature();
    await boomerangExperienceContract.rate(userAddress, workerAddress, businessAddress, secondWorkerRating, businessRating, ipfsHash, sig.v, sig.r, sig.s);
    workerRatingsSum = await boomerangWorkerContract.getRatingsSum(workerAddress, businessAddress);
    Number(workerRatingsSum).should.equal(6);

    sig = await ratingSigner.getSignature();
    await boomerangExperienceContract.rate(userAddress, workerAddress, businessAddress, thirdWorkerRating, businessRating, ipfsHash, sig.v, sig.r, sig.s);
    workerRatingsSum = await boomerangWorkerContract.getRatingsSum(workerAddress, businessAddress);
    Number(workerRatingsSum).should.equal(10);
  });
});
