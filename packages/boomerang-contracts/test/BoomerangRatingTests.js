import { getBoomerangAuthContract, getBoomerangUserContract, getBoomerangWorkerContract, getBoomerangBusinessContract, getBoomerangExperienceContract } from './helpers/contractInstances';

const BigNumber = web3.BigNumber;
import printEvents from './helpers/printEvents';
import { ipfsHash } from './helpers/mockData';
import ethUtil from "ethereumjs-util";
import toTuple from './helpers/toTuple';

require("chai")
  .use(require("chai-as-promised"))
  .use(require("chai-bignumber")(BigNumber))
  .should();

contract("BoomerangRatingTests", function([deployerAddress]) {

  let boomerangAuth;
  let boomerangWorker;
  let boomerangBusiness;
  let boomerangExperience;

  beforeEach(async function() {

    boomerangAuth = await getBoomerangAuthContract();
    boomerangWorker = await getBoomerangWorkerContract(boomerangAuth.address);
    boomerangBusiness = await getBoomerangBusinessContract(boomerangAuth.address);
    boomerangExperience = await getBoomerangExperienceContract(boomerangWorker.address, boomerangBusiness.address);
  });

  it("a user with the correct signature should be able to review a business", async function() {

    const userAddress = '0x74AF84d40c47Bc7d2fe9294562EcA54eAF4Fa0eA';
    const workerAddress = '0x83b21d39574d21ea31b05ecc027ca38633f9354f';
    const businessAddress = '0x8AF0Ba103658814b394e5a61FCeD7033934a97cA';
    const workerRating = 5;
    const businessRating = 5;
    const v = 27;
    const r = '0xc25fe672ad9a174313135ca77d6e26eea15bdf73671ca0d397831226bd00f603';
    const s = '0x4e99fe41230cf95ff04251ef5f364fbf31e66b2d5f752b98fcbdd0457de492e6';

    let numberOfBusinessRatings = await boomerangBusiness.getNumberOfRatings(businessAddress);
    Number(numberOfBusinessRatings).should.equal(0);

    const transaction = await boomerangExperience.rate(userAddress, workerAddress, businessAddress, workerRating, businessRating, ipfsHash, v, r, s);
    printEvents(transaction);

    numberOfBusinessRatings = await boomerangBusiness.getNumberOfRatings(businessAddress);
    Number(numberOfBusinessRatings).should.equal(1);

    await boomerangExperience.rate(userAddress, workerAddress, businessAddress, workerRating, businessRating, ipfsHash, v, r, s).should.be.rejected;
  });
});