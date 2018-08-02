const BigNumber = web3.BigNumber;
import { ipfsHash } from './helpers/mockData';

require("chai")
  .use(require("chai-as-promised"))
  .use(require("chai-bignumber")(BigNumber))
  .should();

const Boomerang = artifacts.require("Boomerang");
const BoomerangToken = artifacts.require("BoomerangToken");

contract("BoomerangBusinessRatingTests", function([deployerAddress, userAddress, workerAddress, businessAddress]) {

  let boomerang;
  let boomerangToken;

  beforeEach(async function() {

    boomerangToken = await BoomerangToken.new();
    boomerang = await Boomerang.new(boomerangToken.address);
  });

  it("reviewing a business should increment the number of ratings", async function() {

    let numberOfBusinessRatings = await boomerang.getNumberOfBusinessRatings(businessAddress);
    Number(numberOfBusinessRatings).should.equal(0);

    const workerRating = 2;
    const businessRating = 3;
    await boomerang.rateExperience(userAddress, workerAddress, businessAddress, workerRating, businessRating, ipfsHash);
    numberOfBusinessRatings = await boomerang.getNumberOfBusinessRatings(businessAddress);
    Number(numberOfBusinessRatings).should.equal(1);

    await boomerang.rateExperience(userAddress, workerAddress, businessAddress, workerRating, businessRating, ipfsHash);
    numberOfBusinessRatings = await boomerang.getNumberOfBusinessRatings(businessAddress);
    Number(numberOfBusinessRatings).should.equal(2);

    await boomerang.rateExperience(userAddress, workerAddress, businessAddress, workerRating, businessRating, ipfsHash);
    numberOfBusinessRatings = await boomerang.getNumberOfBusinessRatings(businessAddress);
    Number(numberOfBusinessRatings).should.equal(3);
  });

  it("the business ratings should sum appropriately", async function() {

    const workerRating = 2;
    const firstBusinessRating = 3;
    const secondBusinessRating = 4;
    const thirdBusinessRating = 4;
    await boomerang.rateExperience(userAddress, workerAddress, businessAddress, workerRating, firstBusinessRating, ipfsHash);

    let businessRatingsSum = await boomerang.getBusinessRatingsSum(businessAddress);
    Number(businessRatingsSum).should.equal(3);

    await boomerang.rateExperience(userAddress, workerAddress, businessAddress, workerRating, secondBusinessRating, ipfsHash);
    businessRatingsSum = await boomerang.getBusinessRatingsSum(businessAddress);
    Number(businessRatingsSum).should.equal(7);

    await boomerang.rateExperience(userAddress, workerAddress, businessAddress, workerRating, thirdBusinessRating, ipfsHash);
    businessRatingsSum = await boomerang.getBusinessRatingsSum(businessAddress);
    Number(businessRatingsSum).should.equal(11);
  });
});
