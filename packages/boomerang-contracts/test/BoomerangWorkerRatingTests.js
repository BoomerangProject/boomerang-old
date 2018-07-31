import assertWorkerRewardSystemStatus from './helpers/assertWorkerRewardSystemStatus';

const BigNumber = web3.BigNumber;
import { ipfsHash, rewardSystem } from './helpers/mockData';

require("chai")
  .use(require("chai-as-promised"))
  .use(require("chai-bignumber")(BigNumber))
  .should();

const Boomerang = artifacts.require("Boomerang");
const BoomerangToken = artifacts.require("BoomerangToken");

contract("BoomerangRatingRewardPercentagesTests.js", function([deployerAddress, userAddress, workerAddress, businessAddress]) {

  let boomerang;
  let boomerangToken;

  beforeEach(async function() {

    boomerangToken = await BoomerangToken.new();
    boomerang = await Boomerang.new(boomerangToken.address);
  });

  it("reviewing a worker should add a rating", async function() {

    let workerAverageRating = await boomerang.getWorkerAverageRating(workerAddress, businessAddress);
    Number(workerAverageRating).should.equal(0);

    const workerRating = 2;
    const businessRating = 3;
    await boomerang.rateExperience(userAddress, workerAddress, businessAddress, workerRating, businessRating, ipfsHash);

    workerAverageRating = await boomerang.getWorkerAverageRating(workerAddress, businessAddress);
    Number(workerAverageRating).should.equal(2);
  });

  it("reviewing a worker should increment the number of ratings", async function() {

    let numberOfWorkerRatings = await boomerang.getNumberOfWorkerRatings(workerAddress, businessAddress);
    Number(numberOfWorkerRatings).should.equal(0);

    const workerRating = 2;
    const businessRating = 3;
    await boomerang.rateExperience(userAddress, workerAddress, businessAddress, workerRating, businessRating, ipfsHash);

    numberOfWorkerRatings = await boomerang.getNumberOfWorkerRatings(workerAddress, businessAddress);
    Number(numberOfWorkerRatings).should.equal(1);
  });

  it("the worker average rating should update appropriately", async function() {

    const firstWorkerRating = 2;
    const secondWorkerRating = 4;
    const thirdWorkerRating = 4;
    const businessRating = 3;
    await boomerang.rateExperience(userAddress, workerAddress, businessAddress, firstWorkerRating, businessRating, ipfsHash);

    let workerAverageRating = await boomerang.getWorkerAverageRating(workerAddress, businessAddress);
    Number(workerAverageRating).should.equal(2);
    console.log(workerAverageRating);

    await boomerang.rateExperience(userAddress, workerAddress, businessAddress, secondWorkerRating, businessRating, ipfsHash);
    workerAverageRating = await boomerang.getWorkerAverageRating(workerAddress, businessAddress);
    Number(workerAverageRating).should.equal(3);
    console.log(workerAverageRating);

    await boomerang.rateExperience(userAddress, workerAddress, businessAddress, thirdWorkerRating, businessRating, ipfsHash);
    workerAverageRating = await boomerang.getWorkerAverageRating(workerAddress, businessAddress);
    console.log(workerAverageRating);
    // Number(workerAverageRating).should.equal(3.66);
  });
});
