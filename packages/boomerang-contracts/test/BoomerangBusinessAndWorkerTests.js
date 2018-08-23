const BigNumber = web3.BigNumber;
import { ipfsHash } from './helpers/mockData';
import { getBoomerangAuthContract, getBoomerangUserContract, getBoomerangWorkerContract, getBoomerangBusinessContract, getBoomerangExperienceContract } from './helpers/contractInstances';

require("chai")
  .use(require("chai-as-promised"))
  .use(require("chai-bignumber")(BigNumber))
  .should();

contract("BoomerangBusinessAndWorkerTests", function([deployerAddress, userAddress, workerAddress, businessAddress]) {

  let boomerangAuth;
  let boomerangWorker;
  let boomerangBusiness;

  beforeEach(async function() {

    boomerangAuth = await getBoomerangAuthContract();
    boomerangWorker = await getBoomerangWorkerContract(boomerangAuth.address);
    boomerangBusiness = await getBoomerangBusinessContract(boomerangAuth.address);
  });

  it("a user should not be able to review a worker that is not employed by the business", async function() {

  });
});
