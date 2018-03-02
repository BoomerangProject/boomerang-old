const BigNumber = web3.BigNumber;

require("chai")
  .use(require("chai-as-promised"))
  .use(require("chai-bignumber")(BigNumber))
  .should();

const KudosWorker = artifacts.require("KudosWorker");

contract("KudosWorkerTests", function([deployer, business, worker, user]) {

  let kudosWorker;

  beforeEach(async function() {

    kudosWorker = await KudosWorker.new();
  });

  it("", async function() {


  });

});
