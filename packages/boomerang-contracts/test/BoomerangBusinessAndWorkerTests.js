const BigNumber = web3.BigNumber;
import { ipfsHash } from './helpers/mockData';

require("chai")
  .use(require("chai-as-promised"))
  .use(require("chai-bignumber")(BigNumber))
  .should();

const Boomerang = artifacts.require("Boomerang");
const BoomerangToken = artifacts.require("BoomerangToken");

contract("BoomerangBusinessAndWorkerTests", function([deployerAddress, userAddress, workerAddress, businessAddress]) {

  let boomerang;
  let boomerangToken;

  beforeEach(async function() {

    boomerangToken = await BoomerangToken.new();
    boomerang = await Boomerang.new(boomerangToken.address);
  });

  it("a user should not be able to review a worker that is not employed by the business", async function() {

  });

});
