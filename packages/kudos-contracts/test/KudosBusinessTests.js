const BigNumber = web3.BigNumber;


require("chai")
  .use(require("chai-as-promised"))
  .use(require("chai-bignumber")(BigNumber))
  .should();

const Kudos = artifacts.require("Kudos");

contract("kudosBusinessTests", function([deployer, business, worker, user]) {

  let kudos;

  beforeEach(async function() {

    kudos = await Kudos.new();
  });


  it("registerWorkerRewardSystem test", async function() {

    const businessAddress = "0xd0a287acbc9b2b4222c5ea38dc0f8f1031b0e5ce";
    const numberOfRewardSteps = 3;
    const numberOfRewardCycles = 4;
    const numberOfRewardLevels = 5;
    const ipfsHash = "0x7aec552a65bfd833319cecd80cb10be136a35c9da94a8c899f2536c371293b93";

    await kudos.registerWorkerRewardSystem(businessAddress, numberOfRewardSteps, numberOfRewardCycles, numberOfRewardLevels, ipfsHash);
  });

});
