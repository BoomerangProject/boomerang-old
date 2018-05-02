const BigNumber = web3.BigNumber;

require("chai")
  .use(require("chai-as-promised"))
  .use(require("chai-bignumber")(BigNumber))
  .should();

const Kudos = artifacts.require("Kudos");

contract("kudosUserTests", function([deployer, business, worker, user]) {

  let kudos;

  beforeEach(async function() {

    kudos = await Kudos.new();
  });
});
