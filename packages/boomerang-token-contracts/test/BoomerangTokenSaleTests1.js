import ether from './helpers/ether'
import {advanceBlock} from './helpers/advanceToBlock'
import {increaseTimeTo, duration} from './helpers/increaseTime'
import latestTime from './helpers/latestTime'
import EVMThrow from './helpers/EVMThrow'


const BigNumber = web3.BigNumber

const should = require('chai')
   .use(require('chai-as-promised'))
   .use(require('chai-bignumber')(BigNumber))
   .should()

const BoomerangToken = artifacts.require('BoomerangToken');
const BoomerangTokenSale = artifacts.require('BoomerangTokenSale');

contract('BoomerangTokenSaleTests1', function ([deployer, wallet, purchaser]) {

   var startTime;
   var endTime;
   var afterEndTime;

   var token;
   var tokenSale;

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

      startTime = latestTime() + duration.weeks(1);
      endTime = startTime + duration.days(30);
      afterEndTime = endTime + duration.seconds(1)

      token = await BoomerangToken.new();
      tokenSale = await BoomerangTokenSale.new(wallet, startTime, token.address);
      await tokenSale.registerTier2Users([purchaser]);
   })

   async function fundContract() {
      var amountOfTokensForSale = await tokenSale.amountOfTokensForSale();
      await token.transfer(tokenSale.address, amountOfTokensForSale);
   }

   describe('funded tokenSale', function () {

      it('tokens should be available', async function () {

         await fundContract();

         var tokensAreAvailable = await tokenSale.tokensAreAvailable();
         tokensAreAvailable.should.equal(true);
      })

      it('should not be active before start', async function () {

         await fundContract();

         var isAfterStartTime = await tokenSale.isAfterStartTime();
         isAfterStartTime.should.equal(false);

         var isBeforeEndTime = await tokenSale.isBeforeEndTime();
         isBeforeEndTime.should.equal(true);

         var tokenSaleIsActive = await tokenSale.isActive();
         tokenSaleIsActive.should.equal(false);
      })

      it('should be active after start and before end', async function () {

         await fundContract();
         await increaseTimeTo(startTime);

         var isAfterStartTime = await tokenSale.isAfterStartTime();
         isAfterStartTime.should.equal(true);

         var isBeforeEndTime = await tokenSale.isBeforeEndTime();
         isBeforeEndTime.should.equal(true);

         var tokenSaleIsActive = await tokenSale.isActive();
         tokenSaleIsActive.should.equal(true);
      })

      it('should not be active after end', async function () {

         await fundContract();
         await increaseTimeTo(afterEndTime);

         var isAfterStartTime = await tokenSale.isAfterStartTime();
         isAfterStartTime.should.equal(true);

         var isBeforeEndTime = await tokenSale.isBeforeEndTime();
         isBeforeEndTime.should.equal(false);

         var tokenSaleIsActive = await tokenSale.isActive();
         tokenSaleIsActive.should.equal(false);
      })

      it('should reject payments before start', async function () {

         await fundContract();

         await tokenSale.sendTransaction({value: value, from: purchaser}).should.be.rejectedWith(EVMThrow);
         await tokenSale.buyTokens({from: purchaser, value: value}).should.be.rejectedWith(EVMThrow);
      })

      it('should accept payments after start and before end', async function () {

         await fundContract();
         await increaseTimeTo(startTime);

         await tokenSale.sendTransaction({value: value, from: purchaser}).should.be.fulfilled;
         await tokenSale.buyTokens({value: value, from: purchaser}).should.be.fulfilled;
      })

      it('should reject payments after end', async function () {

         await fundContract();
         await increaseTimeTo(afterEndTime);

         await tokenSale.sendTransaction({value: value, from: purchaser}).should.be.rejectedWith(EVMThrow);
         await tokenSale.buyTokens({value: value, from: purchaser}).should.be.rejectedWith(EVMThrow);
      })
   })

   describe('unfunded tokenSale', function () {

      it('tokens should not be available', async function () {

         var tokensAreAvailable = await tokenSale.tokensAreAvailable();
         tokensAreAvailable.should.equal(false);
      })

      it('should not be active before start', async function () {

         var isAfterStartTime = await tokenSale.isAfterStartTime();
         isAfterStartTime.should.equal(false);

         var isBeforeEndTime = await tokenSale.isBeforeEndTime();
         isBeforeEndTime.should.equal(true);

         var tokenSaleIsActive = await tokenSale.isActive();
         tokenSaleIsActive.should.equal(false);
      })

      it('should not be active after start and before end', async function () {

         await increaseTimeTo(startTime);

         var isAfterStartTime = await tokenSale.isAfterStartTime();
         isAfterStartTime.should.equal(true);

         var isBeforeEndTime = await tokenSale.isBeforeEndTime();
         isBeforeEndTime.should.equal(true);

         var tokenSaleIsActive = await tokenSale.isActive();
         tokenSaleIsActive.should.equal(false);
      })

      it('should not be active after end', async function () {

         await increaseTimeTo(afterEndTime);

         var isAfterStartTime = await tokenSale.isAfterStartTime();
         isAfterStartTime.should.equal(true);

         var isBeforeEndTime = await tokenSale.isBeforeEndTime();
         isBeforeEndTime.should.equal(false);

         var tokenSaleIsActive = await tokenSale.isActive();
         tokenSaleIsActive.should.equal(false);
      })

      it('should reject payments before start', async function () {

         await tokenSale.sendTransaction({value: value, from: purchaser}).should.be.rejectedWith(EVMThrow);
         await tokenSale.buyTokens({from: purchaser, value: value}).should.be.rejectedWith(EVMThrow);
      })

      it('should reject payments after start and before end', async function () {

         await increaseTimeTo(startTime);

         await tokenSale.sendTransaction({value: value, from: purchaser}).should.be.rejectedWith(EVMThrow);
         await tokenSale.buyTokens({value: value, from: purchaser}).should.be.rejectedWith(EVMThrow);
      })

      it('should reject payments after end', async function () {

         await increaseTimeTo(afterEndTime);

         await tokenSale.sendTransaction({value: value, from: purchaser}).should.be.rejectedWith(EVMThrow);
         await tokenSale.buyTokens({value: value, from: purchaser}).should.be.rejectedWith(EVMThrow);
      })
   })

   describe('purchase through fallback function', function () {

      it('should be logged', async function () {

         await fundContract();
         await increaseTimeTo(startTime);

         const {logs} = await tokenSale.sendTransaction({value: value, from: purchaser});

         const event = logs.find(e => e.event === 'IssueTokens');

         should.exist(event);
         event.args.to.should.equal(purchaser);
         event.args.weiValue.should.be.bignumber.equal(value);
         event.args.amountOfTokens.should.be.bignumber.equal(kutoasPerWei*value);
      })

      it('should decrease the number of tokens available for sale', async function () {

         await fundContract();
         await increaseTimeTo(startTime);

         var tokensAvailable = await tokenSale.tokensAvailable();
         tokensAvailable.should.be.bignumber.equal(amountOfTokensForSale);

         await tokenSale.sendTransaction({value: value, from: purchaser})

         var tokensAvailable = await tokenSale.tokensAvailable();
         var tokensLeft = amountOfTokensForSale-(kutoasPerWei*value);
         tokensAvailable.should.be.bignumber.equal(tokensLeft);
      })

      it('should not affect the total supply', async function () {

         await fundContract();
         await increaseTimeTo(startTime);

         var totalSupply = await token.totalSupply();
         var expectedTotalSupply = 10*oneBillion*tokenUnit;
         totalSupply.should.be.bignumber.equal(expectedTotalSupply);

         await tokenSale.sendTransaction({value: value, from: purchaser})

         var totalSupply = await token.totalSupply();
         totalSupply.should.be.bignumber.equal(expectedTotalSupply);
      })

      it('should be not be less than 1 wei', async function () {

         await fundContract();
         await increaseTimeTo(startTime);

         await tokenSale.sendTransaction({value: 0, from: purchaser}).should.be.rejectedWith(EVMThrow);
      })

      it('should assign tokens to sender', async function () {

         await fundContract();
         await increaseTimeTo(startTime);

         await tokenSale.sendTransaction({value: value, from: purchaser})
         let balance = await token.balanceOf(purchaser);
         balance.should.be.bignumber.equal(kutoasPerWei*value)
      })

      it('should forward funds to wallet', async function () {

         await fundContract();
         await increaseTimeTo(startTime);

         const pre = web3.eth.getBalance(wallet)
         await tokenSale.sendTransaction({value: value, from: purchaser})
         const post = web3.eth.getBalance(wallet)
         post.minus(pre).should.be.bignumber.equal(value)
      })
   })

   describe('purchase through explicit function call', function () {

      it('should be logged', async function () {

         await fundContract();
         await increaseTimeTo(startTime);

         const {logs} = await tokenSale.buyTokens({value: value, from: purchaser})

         const event = logs.find(e => e.event === 'IssueTokens');

         should.exist(event);
         event.args.to.should.equal(purchaser);
         event.args.weiValue.should.be.bignumber.equal(value);
         event.args.amountOfTokens.should.be.bignumber.equal(kutoasPerWei*value);
      })

      it('should decrease the number of tokens available for sale', async function () {

         await fundContract();
         await increaseTimeTo(startTime);

         var tokensAvailable = await tokenSale.tokensAvailable();
         tokensAvailable.should.be.bignumber.equal(amountOfTokensForSale);

         await tokenSale.buyTokens({value: value, from: purchaser})

         var tokensAvailable = await tokenSale.tokensAvailable();
         var tokensLeft = amountOfTokensForSale-(kutoasPerWei*value);
         tokensAvailable.should.be.bignumber.equal(tokensLeft);
      })

      it('should not affect the total supply', async function () {

         await fundContract();
         await increaseTimeTo(startTime);

         var totalSupply = await token.totalSupply();
         var expectedTotalSupply = 10*oneBillion*tokenUnit;
         totalSupply.should.be.bignumber.equal(expectedTotalSupply);

         await tokenSale.buyTokens({value: value, from: purchaser})

         var totalSupply = await token.totalSupply();
         totalSupply.should.be.bignumber.equal(expectedTotalSupply);
      })

      it('should be not be less than 1 wei', async function () {

         await fundContract();
         await increaseTimeTo(startTime);

         await tokenSale.buyTokens({value: 0, from: purchaser}).should.be.rejectedWith(EVMThrow);
      })

      it('should assign tokens to sender', async function () {

         await fundContract();
         await increaseTimeTo(startTime);

         await tokenSale.buyTokens({value: value, from: purchaser})
         let balance = await token.balanceOf(purchaser);
         balance.should.be.bignumber.equal(kutoasPerWei*value)
      })

      it('should forward funds to wallet', async function () {

         await fundContract();
         await increaseTimeTo(startTime);

         const pre = web3.eth.getBalance(wallet)
         await tokenSale.buyTokens({value: value, from: purchaser})
         const post = web3.eth.getBalance(wallet)
         post.minus(pre).should.be.bignumber.equal(value)
      })
   })

   describe('token sale that is manually ended', function () {

      it('should transfer remaining tokens to owner', async function () {

         await fundContract();
         await increaseTimeTo(startTime);

         var totalSupply = await token.totalSupply();
         var balance = await token.balanceOf(deployer);
         balance.should.be.bignumber.equal(totalSupply-amountOfTokensForSale)

         await tokenSale.sendTransaction({value: value, from: purchaser})
         await tokenSale.endTokenSale()

         var balance = await token.balanceOf(deployer);
         balance.should.be.bignumber.equal(totalSupply-(kutoasPerWei*value));
      })

      it('should no longer be active', async function () {

         await fundContract();
         await increaseTimeTo(startTime);

         var tokensAreAvailable = await tokenSale.tokensAreAvailable();
         tokensAreAvailable.should.equal(true);

         var tokenSaleIsActive = await tokenSale.isActive();
         tokenSaleIsActive.should.equal(true);

         await tokenSale.sendTransaction({value: value, from: purchaser}).should.be.fulfilled;
         await tokenSale.endTokenSale()

         var tokensAreAvailable = await tokenSale.tokensAreAvailable();
         tokensAreAvailable.should.equal(false);

         var tokenSaleIsActive = await tokenSale.isActive();
         tokenSaleIsActive.should.equal(false);

         await tokenSale.sendTransaction({value: value, from: purchaser}).should.be.rejectedWith(EVMThrow);
      })

      it('should only be called when there are tokens available', async function () {

         await increaseTimeTo(startTime);
         await tokenSale.endTokenSale().should.be.rejectedWith(EVMThrow);
      })
   })

   it('should gift the last purchaser with remaining kutoas if there are less kutoas available than can be purchased with 1 wei', async function () {

      const smallValue = kutoasPerWei.add(kutoasPerWei.div(2));

      await token.transfer(tokenSale.address, smallValue);
      await increaseTimeTo(startTime);

      var tokenSaleIsActive = await tokenSale.isActive();
      tokenSaleIsActive.should.equal(true);

      var tokensAvailable = await tokenSale.tokensAvailable();
      tokensAvailable.should.be.bignumber.equal(smallValue);

      var tokensAreAvailable = await tokenSale.tokensAreAvailable();
      tokensAreAvailable.should.equal(true);

      await tokenSale.sendTransaction({value: 1, from: purchaser})

      var tokensAvailable = await tokenSale.tokensAvailable();
      tokensAvailable.should.be.bignumber.equal(0);

      var tokensAreAvailable = await tokenSale.tokensAreAvailable();
      tokensAreAvailable.should.equal(false);

      var tokenSaleIsActive = await tokenSale.isActive();
      tokenSaleIsActive.should.equal(false);

      let balance = await token.balanceOf(purchaser);
      balance.should.be.bignumber.equal(smallValue)
   })

   it('should refund the last purchaser if they send too much ether', async function () {

      await token.transfer(tokenSale.address, kutoasPerWei*10);
      await increaseTimeTo(startTime);

      const preEtherBalance = web3.eth.getBalance(wallet);
      const preTokenBalance = await token.balanceOf(purchaser);
      await tokenSale.sendTransaction({value: 20, from: purchaser})
      const postEtherBalance = web3.eth.getBalance(wallet);
      const postTokenBalance = await token.balanceOf(purchaser);

      preTokenBalance.should.be.bignumber.equal(0);
      postTokenBalance.should.be.bignumber.equal(kutoasPerWei*10);

      postEtherBalance.minus(preEtherBalance).should.be.bignumber.equal(10);
   })
})
