const BigNumber = web3.BigNumber;
import { ipfsHash } from './helpers/mockData';

require("chai")
  .use(require("chai-as-promised"))
  .use(require("chai-bignumber")(BigNumber))
  .should();

const Kudos = artifacts.require("Kudos");
const KudosToken = artifacts.require("KudosToken");

contract("KudosGrowthPoolRewardSystemTests", function([deployerAddress, userAddress, workerAddress, businessAddress]) {

  let kudos;
  let kudosToken;
  const tokenUnit = new BigNumber(10 ** 18);

  beforeEach(async function() {

    kudosToken = await KudosToken.new();
    kudos = await Kudos.new(kudosToken.address);
  });

  it("deployer should be able to register growth pool reward system", async function() {

    const numberOfRewardSteps = 3;
    const numberOfRewardCyclesForLevel = [4,4,4,4,4];
    const numberOfRewardLevels = 5;
    const levelRewards = [300, 400, 500, 600, 700];

    await kudos.registerGrowthPoolRewardSystem(numberOfRewardSteps, numberOfRewardCyclesForLevel, numberOfRewardLevels, levelRewards, ipfsHash, {from: deployerAddress});
    const growthPoolRewardSystemStruct = await kudos.getGrowthPoolRewardSystem();

    Number(growthPoolRewardSystemStruct[0]).should.equal(numberOfRewardSteps);

    for (let i = 0; i < numberOfRewardCyclesForLevel.length; i++) {
      Number(growthPoolRewardSystemStruct[1][i]).should.equal(numberOfRewardCyclesForLevel[i]);
    }

    Number(growthPoolRewardSystemStruct[2]).should.equal(numberOfRewardLevels);

    for (let i = 0; i < levelRewards.length; i++) {
      Number(growthPoolRewardSystemStruct[3][i]).should.equal(levelRewards[i]);
    }

    growthPoolRewardSystemStruct[4].should.equal(ipfsHash);
  });

  it("non-deployer should not be able to register growth pool reward system", async function() {

    const numberOfRewardSteps = 3;
    const numberOfRewardCyclesForLevel = [4,4,4,4,4];
    const numberOfRewardLevels = 5;
    const levelRewards = [300, 400, 500, 600, 700];

    await kudos.registerGrowthPoolRewardSystem(numberOfRewardSteps, numberOfRewardCyclesForLevel, numberOfRewardLevels, levelRewards, ipfsHash, {from: businessAddress}).should.be.rejected;
  });
});
