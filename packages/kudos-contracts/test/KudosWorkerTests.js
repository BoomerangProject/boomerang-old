const BigNumber = web3.BigNumber;

require("chai")
  .use(require("chai-as-promised"))
  .use(require("chai-bignumber")(BigNumber))
  .should();

const Kudos = artifacts.require("Kudos");

contract("KudosWorkerTests", function([deployer, business, worker, user]) {

  let kudos;

  beforeEach(async function() {

    kudos = await Kudos.new();
  });

  // it("user", async function() {
  //
  //   var isBusiness = await kudos.isBusiness(business);
  //   isBusiness.should.equal(false);
  //
  //   await kudos.registerAsBusiness({from: business});
  //
  //   var isBusiness = await kudos.isBusiness(business);
  //   isBusiness.should.equal(true);
  // });

});
