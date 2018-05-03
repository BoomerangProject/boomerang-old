const BigNumber = web3.BigNumber;

require("chai")
  .use(require("chai-as-promised"))
  .use(require("chai-bignumber")(BigNumber))
  .should();

const Kudos = artifacts.require("Kudos");

contract("WorkerOnboardingTests", function([deployer, business, worker, secondWorker, user]) {

  let kudos;

  beforeEach(async function() {

    kudos = await Kudos.new();
  });

  it("business should be able to register", async function() {

    var isBusiness = await kudos.isBusiness(business);
    isBusiness.should.equal(false);

    await kudos.registerAsBusiness(business);

    var isBusiness = await kudos.isBusiness(business);
    isBusiness.should.equal(true);
  });

  it("registered business should be able to add worker", async function() {

    await kudos.registerAsBusiness(business);

    var businessHasApprovedWorker = await kudos.businessHasApprovedWorker(business, worker);
    businessHasApprovedWorker.should.equal(false);

    await kudos.addWorker(worker, business);

    var businessHasApprovedWorker = await kudos.businessHasApprovedWorker(business, worker);
    businessHasApprovedWorker.should.equal(true);
  });

  it("worker list should be updated when worker is added", async function() {

    await kudos.registerAsBusiness(business);

    var numberOfEmployees = await kudos.numberOfEmployees(business);
    numberOfEmployees.toNumber().should.equal(0);

    await kudos.addWorker(worker, business);
    await kudos.addBusiness(worker, business);

    var numberOfEmployees = await kudos.numberOfEmployees(business);
    numberOfEmployees.toNumber().should.equal(1);

    await kudos.addBusiness(secondWorker, business);
    await kudos.addWorker(secondWorker, business);

    var numberOfEmployees = await kudos.numberOfEmployees(business);
    numberOfEmployees.toNumber().should.equal(2);
  });

  it("worker list should not contain duplicate addresses", async function() {

    await kudos.registerAsBusiness(business);

    var numberOfEmployees = await kudos.numberOfEmployees(business);
    numberOfEmployees.toNumber().should.equal(0);

    await kudos.addWorker(worker, business);
    await kudos.addBusiness(worker, business);

    var numberOfEmployees = await kudos.numberOfEmployees(business);
    numberOfEmployees.toNumber().should.equal(1);

    await kudos.addBusiness(worker, business);
    await kudos.addWorker(worker, business);

    var numberOfEmployees = await kudos.numberOfEmployees(business);
    numberOfEmployees.toNumber().should.equal(1);
  });
});
