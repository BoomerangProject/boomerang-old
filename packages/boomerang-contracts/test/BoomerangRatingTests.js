const BigNumber = web3.BigNumber;
import { ipfsHash } from './helpers/mockData';
import ethUtil from "ethereumjs-util";
import toTuple from './helpers/toTuple';

require("chai")
  .use(require("chai-as-promised"))
  .use(require("chai-bignumber")(BigNumber))
  .should();

const Boomerang = artifacts.require("Boomerang");
const BoomerangToken = artifacts.require("BoomerangToken");

contract("BoomerangRatingTests", function([deployerAddress]) {

  let boomerang;
  let boomerangToken;

  beforeEach(async function() {

    boomerangToken = await BoomerangToken.new();
    boomerang = await Boomerang.new(boomerangToken.address);
  });

  // it("test test test", async function() {
  //
  //   const userAddress = '0x74AF84d40c47Bc7d2fe9294562EcA54eAF4Fa0eA';
  //   const workerAddress = '0x83b21d39574d21ea31b05ecc027ca38633f9354f';
  //   const businessAddress = '0x8AF0Ba103658814b394e5a61FCeD7033934a97cA';
  //   const workerRating = 5;
  //   const businessRating = 5;
  //   // const v = 27;
  //   // const v = 27;
  //   const v = web3.fromDecimal(27);
  //
  //   console.log(v);
  //   const r = '0xc25fe672ad9a174313135ca77d6e26eea15bdf73671ca0d397831226bd00f603';
  //   const s = '0x4e99fe41230cf95ff04251ef5f364fbf31e66b2d5f752b98fcbdd0457de492e6';
  //
  //
  //     // const transaction = await boomerang.test(userAddress, businessAddress);
  //     const transaction = await boomerang.test(userAddress, businessAddress, v, r, s);
  //     // const event = transaction.logs[0];
  //     // console.log(event);
  //
  //     console.log('------');
  //     for (let i = 0; i < transaction.logs.length; i++) {
  //       const eventName = transaction.logs[i].event;
  //       const eventArgs = transaction.logs[i].args;
  //       console.log(eventName);
  //       console.log(eventArgs);
  //       console.log('---');
  //     }
  // });

  it("a user with the correct signature should be able to review a business", async function() {

    const userAddress = '0x74AF84d40c47Bc7d2fe9294562EcA54eAF4Fa0eA';
    const workerAddress = '0x83b21d39574d21ea31b05ecc027ca38633f9354f';
    const businessAddress = '0x8AF0Ba103658814b394e5a61FCeD7033934a97cA';
    const workerRating = 5;
    const businessRating = 5;
    const v = 27;
    const r = '0xc25fe672ad9a174313135ca77d6e26eea15bdf73671ca0d397831226bd00f603';
    const s = '0x4e99fe41230cf95ff04251ef5f364fbf31e66b2d5f752b98fcbdd0457de492e6';

    let numberOfBusinessRatings = await boomerang.getNumberOfBusinessRatings(businessAddress);
    Number(numberOfBusinessRatings).should.equal(0);

    const transaction = await boomerang.rateBoomerangExperience(userAddress, workerAddress, businessAddress, workerRating, businessRating, ipfsHash, toTuple({_v: v, _r: r, _s: s}));

    console.log('------');
    for (let i = 0; i < transaction.logs.length; i++) {
      const eventName = transaction.logs[i].event;
      const eventArgs = transaction.logs[i].args;
      console.log(eventName);
      console.log(eventArgs);
      console.log('---');
    }

    numberOfBusinessRatings = await boomerang.getNumberOfBusinessRatings(businessAddress);
    Number(numberOfBusinessRatings).should.equal(1);

    await boomerang.rateBoomerangExperience(userAddress, workerAddress, businessAddress, workerRating, businessRating, ipfsHash, toTuple({_v: v, _r: r, _s: s})).should.be.rejected;
  });
});