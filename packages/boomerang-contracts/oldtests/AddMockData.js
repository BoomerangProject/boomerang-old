const BigNumber = web3.BigNumber;

require("chai")
  .use(require("chai-as-promised"))
  .use(require("chai-bignumber")(BigNumber))
  .should();

const Boomerang = artifacts.require("Boomerang");

const user = "0xfe996c9a9b7f29580c6b9ab92fc692065bf25f80";
const worker = "0x11c56a8b60a10323eb4402d698f9f97a0260d3d9";
const business = "0xd0a287acbc9b2b4222c5ea38dc0f8f1031b0e5ce";

contract("AddMockData", function() {

  let boomerang;

  beforeEach(async function() {

    // boomerang = await Boomerang.at();
  });

  it("add business", async function() {

    await boomerang.registerAsBusiness(business);
    var isBusiness = await boomerang.isBusiness(business);
    isBusiness.should.equal(true);
  });

  it("add worker to business", async function() {

    await boomerang.addWorker(worker, business);
    await boomerang.addBusiness(worker, business);
    var numberOfEmployees = await boomerang.numberOfEmployees(business);
    numberOfEmployees.toNumber().should.equal(1);
  });
});
