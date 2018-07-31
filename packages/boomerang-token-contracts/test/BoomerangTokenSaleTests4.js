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

contract('BoomerangTokenSaleTests4', function (accounts) {

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

   const cap = weiPerDollar.mul(100000);
   const maxValue = Math.pow(2, 256) - 1; // Maximum uint256 value

   before(async function() {
     //Advance to the next block to correctly read time in the solidity "now" function interpreted by testrpc
     await advanceBlock()
   })

   beforeEach(async function() {

      startTime = latestTime() + duration.weeks(1);
      endTime = startTime + duration.days(30);
      afterEndTime = endTime + duration.seconds(1)

      token = await BoomerangToken.new();
   })

   async function fundContract() {
      var amountOfTokensForSale = await tokenSale.amountOfTokensForSale();
      await token.transfer(tokenSale.address, amountOfTokensForSale);
   }

   describe('whitelist tests', async () => {
        let sale;
        let fundRecipient = accounts[5];

        // Test all accounts have their participation caps set properly.
        beforeEach(async () => {
            tokenSale = await BoomerangTokenSale.new(fundRecipient, startTime, token.address);

            for (let user of accounts) {
                assert.equal((await tokenSale.participationCaps(user)).toNumber(), 0);
            }
        });

        describe('registerTier1Users', async () => {
            it('should be able to get called with an empty list of users', async () => {
                await tokenSale.registerTier1Users([]);
            });

            it('should not allow to be called by non-owner', async () => {
                await expectRevert(tokenSale.registerTier1Users([], {from: accounts[7]}));
            });

            it('should set participation cap', async () => {
                let users = [accounts[1], accounts[4]];

                await tokenSale.registerTier1Users(users);

                for (let user of users) {
                    var userCap = (await tokenSale.participationCaps(user)).toNumber();
                    assert.equal(userCap, cap);
                }
            });

            it('should allow upgrading existing users to remove cap', async () => {
                let users = [accounts[2], accounts[3], accounts[4]];

                await tokenSale.registerTier1Users(users);

                for (let user of users) {
                   var userCap = (await tokenSale.participationCaps(user)).toNumber();
                   assert.equal(userCap, cap);
                }

                await tokenSale.registerTier2Users(users);

                for (let user of users) {
                   var userCap = (await tokenSale.participationCaps(user)).toNumber();
                   assert.equal(userCap, maxValue);
                }
            });
        });

        describe('registerTier2Users', async () => {
            it('should be able to get called with an empty list of users', async () => {
                await tokenSale.registerTier2Users([]);
            });

            it('should not allow to be called by non-owner', async () => {
                let stranger = accounts[7];
                assert.notEqual(await tokenSale.owner(), stranger);

                await expectRevert(tokenSale.registerTier2Users([], {from: stranger}));
            });

            it('should remove cap', async () => {
                let users = [accounts[1], accounts[4]];

                await tokenSale.registerTier2Users(users);

                for (let user of users) {
                   var userCap = (await tokenSale.participationCaps(user)).toNumber();
                   assert.equal(userCap, maxValue);
                }
            });

            it('should allow downgrading existing users to tier1', async () => {
                let users = [accounts[2], accounts[3], accounts[4]];

                await tokenSale.registerTier2Users(users);

                for (let user of users) {
                   var userCap = (await tokenSale.participationCaps(user)).toNumber();
                   assert.equal(userCap, maxValue);
                }

                await tokenSale.registerTier1Users(users);

                for (let user of users) {
                   var userCap = (await tokenSale.participationCaps(user)).toNumber();
                   assert.equal(userCap, cap);
                }
            });
        });

        describe('unregisterUsers', async () => {
            it('should be able to get called with an empty list of users', async () => {
                await tokenSale.unregisterUsers([]);
            });

            it('should not allow to be called by non-owner', async () => {
                let stranger = accounts[7];
                assert.notEqual(await tokenSale.owner(), stranger);

                await expectRevert(tokenSale.unregisterUsers([], {from: stranger}));
            });

            it('should remove tier 1 users from whitelist', async () => {
                let users = [accounts[1], accounts[4]];

                await tokenSale.registerTier1Users(users);

                for (let user of users) {
                   var userCap = (await tokenSale.participationCaps(user)).toNumber();
                   assert.equal(userCap, cap);
                }

                await tokenSale.unregisterUsers(users);

                for (let user of users) {
                   var userCap = (await tokenSale.participationCaps(user)).toNumber();
                   assert.equal(userCap, 0);
                }
            });

            it('should remove tier 2 users from whitelist', async () => {
                let users = [accounts[1], accounts[4]];

                await tokenSale.registerTier2Users(users);

                for (let user of users) {
                   var userCap = (await tokenSale.participationCaps(user)).toNumber();
                   assert.equal(userCap, maxValue);
                }

                await tokenSale.unregisterUsers(users);

                for (let user of users) {
                   var userCap = (await tokenSale.participationCaps(user)).toNumber();
                   assert.equal(userCap, 0);
                }
            });
        });
    });
})
