const BigNumber = web3.BigNumber;

require("chai")
  .use(require("chai-as-promised"))
  .use(require("chai-bignumber")(BigNumber))
  .should();

const Kudos = artifacts.require("Kudos");

contract("kudosTests", function([deployer, business, worker, secondWorker, thirdWorker, user]) {

  let kudos;

  beforeEach(async function() {

    kudos = await Kudos.new();
  });

  // it("business should be able to register", async function() {
  //
  //   var isBusiness = await kudos.isBusiness(business);
  //   isBusiness.should.equal(false);
  //
  //   await kudos.registerAsBusiness({from: business});
  //
  //   var isBusiness = await kudos.isBusiness(business);
  //   isBusiness.should.equal(true);
  // });
  //
  // it("registered business should be able to add employee", async function() {
  //
  //   await kudos.registerAsBusiness({from: business});
  //
  //   var isEmployee = await kudos.isEmployee(business, worker);
  //   isEmployee.should.equal(false);
  //
  //   await kudos.addEmployee(worker, {from: business});
  //
  //   var isEmployee = await kudos.isEmployee(business, worker);
  //   isEmployee.should.equal(true);
  // });
  //
  // it("non-registered business should not be able to add employee", async function() {
  //
  //   var isEmployee = await kudos.isEmployee(business, worker);
  //   isEmployee.should.equal(false);
  //
  //   await kudos.addEmployee(worker, {from: business}).should.be.rejectedWith("revert");
  //
  //   var isEmployee = await kudos.isEmployee(business, worker);
  //   isEmployee.should.equal(false);
  //
  // });
  //
  // it("employee list should be updated when employee is added", async function() {
  //
  //   await kudos.registerAsBusiness({from: business});
  //
  //   var numberOfEmployees = await kudos.numberOfEmployees(business);
  //   numberOfEmployees.toNumber().should.equal(0);
  //
  //   await kudos.addEmployee(worker, {from: business});
  //   await kudos.addEmployer(business, {from: worker});
  //
  //   var numberOfEmployees = await kudos.numberOfEmployees(business);
  //   numberOfEmployees.toNumber().should.equal(1);
  //
  //   await kudos.addEmployee(secondWorker, {from: business});
  //   await kudos.addEmployer(business, {from: secondWorker});
  //
  //   var numberOfEmployees = await kudos.numberOfEmployees(business);
  //   numberOfEmployees.toNumber().should.equal(2);
  // });
  //
  //
  // it("employee list should not contain duplicate addresses", async function() {
  //
  //   await kudos.registerAsBusiness({from: business});
  //
  //   var numberOfEmployees = await kudos.numberOfEmployees(business);
  //   numberOfEmployees.toNumber().should.equal(0);
  //
  //   await kudos.addEmployee(worker, {from: business});
  //   await kudos.addEmployer(business, {from: worker});
  //
  //   var numberOfEmployees = await kudos.numberOfEmployees(business);
  //   numberOfEmployees.toNumber().should.equal(1);
  //
  //   await kudos.addEmployee(worker, {from: business});
  //   await kudos.addEmployer(business, {from: worker});
  //
  //   var numberOfEmployees = await kudos.numberOfEmployees(business);
  //   numberOfEmployees.toNumber().should.equal(1);
  // });
});
