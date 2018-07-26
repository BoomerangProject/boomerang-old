const BigNumber = web3.BigNumber;
import { ipfsHash } from './helpers/mockData';

require("chai")
  .use(require("chai-as-promised"))
  .use(require("chai-bignumber")(BigNumber))
  .should();

const Kudos = artifacts.require("Kudos");
const KudosToken = artifacts.require("KudosToken");

contract("KudosRatingRewardPercentagesTests.js", function([deployerAddress, userAddress, workerAddress, businessAddress]) {

  let kudos;
  let kudosToken;
  const tokenUnit = new BigNumber(10 ** 18);

  beforeEach(async function() {

    kudosToken = await KudosToken.new();
    kudos = await Kudos.new(kudosToken.address);
  });

  it("", async function() {


  });
});
