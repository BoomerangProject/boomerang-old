const BigNumber = web3.BigNumber;
import { ipfsHash } from './helpers/mockData';

require("chai")
  .use(require("chai-as-promised"))
  .use(require("chai-bignumber")(BigNumber))
  .should();

const Boomerang = artifacts.require("Boomerang");
const BoomerangToken = artifacts.require("BoomerangToken");

contract("BoomerangWorkerRewardSystemTests", function([deployerAddress, userAddress, workerAddress, businessAddress]) {

  let boomerang;
  let boomerangToken;
  const tokenUnit = new BigNumber(10 ** 18);

  beforeEach(async function() {

    boomerangToken = await BoomerangToken.new();
    boomerang = await Boomerang.new(boomerangToken.address);
  });

  it("business should be able to register worker reward system", async function() {

    const numberOfRewardSteps = 3;
    const numberOfRewardCyclesForLevel = [4,4,4,4,4];
    const numberOfRewardLevels = 5;
    const levelRewards = [300, 400, 500, 600, 700];

    await boomerang.registerWorkerRewardSystem(businessAddress, numberOfRewardSteps, numberOfRewardCyclesForLevel, numberOfRewardLevels, levelRewards, ipfsHash);
    const workerRewardSystemStruct = await boomerang.getWorkerRewardSystem(businessAddress);

    Number(workerRewardSystemStruct[0]).should.equal(numberOfRewardSteps);

    for (let i = 0; i < numberOfRewardCyclesForLevel.length; i++) {
      Number(workerRewardSystemStruct[1][i]).should.equal(numberOfRewardCyclesForLevel[i]);
    }

    Number(workerRewardSystemStruct[2]).should.equal(numberOfRewardLevels);

    for (let i = 0; i < levelRewards.length; i++) {
      Number(workerRewardSystemStruct[3][i]).should.equal(levelRewards[i]);
    }

    workerRewardSystemStruct[4].should.equal(ipfsHash);
  });
});
