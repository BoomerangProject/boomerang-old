const BigNumber = web3.BigNumber;

require("chai")
  .use(require("chai-as-promised"))
  .use(require("chai-bignumber")(BigNumber))
  .should();

const Boomerang = artifacts.require("Boomerang");

contract("BoomerangWorkerTests", function([deployer, business, worker, user]) {

  let boomerang;

  beforeEach(async function() {

    boomerang = await Boomerang.new();
  });

  // it("user", async function() {
  //
  //   var isBusiness = await boomerang.isBusiness(business);
  //   isBusiness.should.equal(false);
  //
  //   await boomerang.registerAsBusiness({from: business});
  //
  //   var isBusiness = await boomerang.isBusiness(business);
  //   isBusiness.should.equal(true);
  // });

});
