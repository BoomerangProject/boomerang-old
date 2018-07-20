const BigNumber = web3.BigNumber;
import { kudosTokenContractAddress } from './helpers/ContractAddresses';

require("chai")
  .use(require("chai-as-promised"))
  .use(require("chai-bignumber")(BigNumber))
  .should();

const Kudos = artifacts.require("Kudos");

contract("KudosUserRewardSystemTests", function([deployerAddress, userAddress, workerAddress, businessAddress]) {

  let kudos;

  beforeEach(async function() {

    kudos = await Kudos.new(kudosTokenContractAddress);
    // kudos = await Kudos.at('0x6a5fd45fdbdf3da997c4222df7f197eeb4155ecc');
  });

  it("business should be able to register user reward system", async function() {

    const numberOfRewardSteps = 3;
    const numberOfRewardCycles = 4;
    const numberOfRewardLevels = 5;
    const levelRewards = [300, 400, 500, 600, 700];
    const ipfsHash = "0x7aec552a65bfd833319cecd80cb10be136a35c9da94a8c899f2536c371293b93";

    await kudos.registerUserRewardSystem(businessAddress, numberOfRewardSteps, numberOfRewardCycles, numberOfRewardLevels, levelRewards, ipfsHash);
    const userRewardSystemStruct = await kudos.getUserRewardSystem(businessAddress);

    Number(userRewardSystemStruct[0]).should.equal(numberOfRewardSteps);
    Number(userRewardSystemStruct[1]).should.equal(numberOfRewardCycles);
    Number(userRewardSystemStruct[2]).should.equal(numberOfRewardLevels);

    for (let i = 0; i < levelRewards.length; i++) {
      Number(userRewardSystemStruct[3][i]).should.equal(levelRewards[i]);
    }

    userRewardSystemStruct[4].should.equal(ipfsHash);
  });
});
