const BigNumber = web3.BigNumber;


require("chai")
  .use(require("chai-as-promised"))
  .use(require("chai-bignumber")(BigNumber))
  .should();

const Boomerang = artifacts.require("Boomerang");

contract("boomerangUserTests", function([deployer, business, worker, user]) {

  let boomerang;

  beforeEach(async function() {

    boomerang = await Boomerang.new();
  });
});
