const BigNumber = web3.BigNumber;
import expectRevert from './helpers/expectRevert';
import { kudosTokenContractAddress } from './helpers/ContractAddresses';

require("chai")
  .use(require("chai-as-promised"))
  .use(require("chai-bignumber")(BigNumber))
  .should();

const Kudos = artifacts.require("Kudos");

contract("KudosWorkerRewardSystemTests", function([deployerAddress, userAddress, workerAddress, businessAddress]) {

  let kudos;

  beforeEach(async function() {

    kudos = await Kudos.new(kudosTokenContractAddress);
    // kudos = await Kudos.at('0x6a5fd45fdbdf3da997c4222df7f197eeb4155ecc');
  });

  it("deployer should be able to register growth pool reward system", async function() {

    const numberOfRewardSteps = 3;
    const numberOfRewardCyclesForLevel = [4,4,4,4,4];
    const numberOfRewardLevels = 5;
    const levelRewards = [300, 400, 500, 600, 700];
    const ipfsHash = "0x7aec552a65bfd833319cecd80cb10be136a35c9da94a8c899f2536c371293b93";

    await kudos.registerGrowthPoolRewardSystem(numberOfRewardSteps, numberOfRewardCyclesForLevel, numberOfRewardCyclesForLevel, levelRewards, ipfsHash);
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
    const ipfsHash = "0x7aec552a65bfd833319cecd80cb10be136a35c9da94a8c899f2536c371293b93";

    await kudos.registerGrowthPoolRewardSystem(numberOfRewardSteps, numberOfRewardCyclesForLevel, numberOfRewardLevels, levelRewards, ipfsHash, {from: businessAddress}).should.be.rejected;
  });
});
