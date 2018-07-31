const BigNumber = web3.BigNumber;

require("chai")
  .use(require("chai-as-promised"))
  .use(require("chai-bignumber")(BigNumber))
  .should();

const Boomerang = artifacts.require("Boomerang");

contract("WorkerOnboardingTests", function([deployer, business, worker, secondWorker, user]) {

  let boomerang;

  beforeEach(async function() {

    boomerang = await Boomerang.new();
  });

  it("business should be able to register", async function() {

    var isBusiness = await boomerang.isBusiness(business);
    isBusiness.should.equal(false);

    await boomerang.registerAsBusiness(business);

    var isBusiness = await boomerang.isBusiness(business);
    isBusiness.should.equal(true);
  });

  it("registered business should be able to add worker", async function() {

    await boomerang.registerAsBusiness(business);

    var businessHasApprovedWorker = await boomerang.businessHasApprovedWorker(business, worker);
    businessHasApprovedWorker.should.equal(false);

    await boomerang.addWorker(worker, business);

    var businessHasApprovedWorker = await boomerang.businessHasApprovedWorker(business, worker);
    businessHasApprovedWorker.should.equal(true);
  });

  it("worker list should be updated when worker is added", async function() {

    await boomerang.registerAsBusiness(business);

    var numberOfEmployees = await boomerang.numberOfEmployees(business);
    numberOfEmployees.toNumber().should.equal(0);

    await boomerang.addWorker(worker, business);
    await boomerang.addBusiness(worker, business);

    var numberOfEmployees = await boomerang.numberOfEmployees(business);
    numberOfEmployees.toNumber().should.equal(1);

    await boomerang.addBusiness(secondWorker, business);
    await boomerang.addWorker(secondWorker, business);

    var numberOfEmployees = await boomerang.numberOfEmployees(business);
    numberOfEmployees.toNumber().should.equal(2);
  });

  it("worker list should not contain duplicate addresses", async function() {

    await boomerang.registerAsBusiness(business);

    var numberOfEmployees = await boomerang.numberOfEmployees(business);
    numberOfEmployees.toNumber().should.equal(0);

    await boomerang.addWorker(worker, business);
    await boomerang.addBusiness(worker, business);

    var numberOfEmployees = await boomerang.numberOfEmployees(business);
    numberOfEmployees.toNumber().should.equal(1);

    await boomerang.addBusiness(worker, business);
    await boomerang.addWorker(worker, business);

    var numberOfEmployees = await boomerang.numberOfEmployees(business);
    numberOfEmployees.toNumber().should.equal(1);
  });
});
