import ether from './helpers/ether'
import {advanceBlock} from './helpers/advanceToBlock'
import {increaseTimeTo, duration} from './helpers/increaseTime'
import latestTime from './helpers/latestTime'
import EVMThrow from './helpers/EVMThrow'
import expectRevert from './helpers/expectRevert';


const BigNumber = web3.BigNumber

const should = require('chai')
   .use(require('chai-as-promised'))
   .use(require('chai-bignumber')(BigNumber))
   .should()

const BoomerangToken = artifacts.require('BoomerangToken');
const BoomerangTokenSale = artifacts.require('BoomerangTokenSale');

contract('BoomerangTokenSaleTests2', function ([deployer, wallet, purchaser]) {

   var now;
   var startTime;
   var endTime;
   var afterEndTime;

   var token;

   const value = ether(42);

   const ethPriceInDollars = new BigNumber(300);
   const tokenUnit = new BigNumber(10 ** 18);
   const oneMillion = new BigNumber(10 ** 6);
   const oneBillion = new BigNumber(10 ** 9);
   const amountOfTokensForSale = new BigNumber(4).mul(oneBillion).mul(tokenUnit);

   const goalInDollars = new BigNumber(30).mul(oneMillion);
   const kutoasPerDollar = amountOfTokensForSale.div(goalInDollars);

   const weiPerDollar = tokenUnit.div(ethPriceInDollars);
   const kutoasPerWei = kutoasPerDollar.div(weiPerDollar);

   before(async function() {
     //Advance to the next block to correctly read time in the solidity "now" function interpreted by testrpc
     await advanceBlock()
   })

   beforeEach(async function() {

      now = latestTime();
      startTime = now + duration.weeks(1);
      endTime = startTime + duration.days(7);
      afterEndTime = endTime + duration.seconds(1)

      token = await BoomerangToken.new();
   })

   describe('construction', async () => {

      it('should not allow to initialize with null wallet address', async () => {
         await expectRevert(BoomerangTokenSale.new(null, now + 100, token.address));
      });

      it('should not allow to initialize with 0 wallet address', async () => {
         await expectRevert(BoomerangTokenSale.new(0, now + 100, token.address));
      });

      it('should be initialized with a future starting time', async () => {
         await expectRevert(BoomerangTokenSale.new(wallet, now - 100, token.address));
      });

      it('should not allow to initialize with null token contract address', async () => {
         await expectRevert(BoomerangTokenSale.new(wallet, now + 100, null));
      });

      it('should not allow to initialize with 0 token contract address', async () => {
         await expectRevert(BoomerangTokenSale.new(wallet, now + 100, 0));
      });

      it('should be ownable', async () => {
         let sale = await BoomerangTokenSale.new(wallet, now + 10000, token.address);
         assert.equal(await sale.owner(), deployer);
      });
   });
})
