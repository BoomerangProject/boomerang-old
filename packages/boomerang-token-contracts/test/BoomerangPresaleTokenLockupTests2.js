const BigNumber = web3.BigNumber

require('chai')
  .use(require('chai-as-promised'))
  .use(require('chai-bignumber')(BigNumber))
  .should()


import latestTime from './helpers/latestTime'
import {increaseTimeTo, duration} from './helpers/increaseTime'
import expectRevert from './helpers/expectRevert';

const BoomerangToken = artifacts.require('BoomerangToken')
const BoomerangPresaleTokenLockup = artifacts.require('BoomerangPresaleTokenLockup')

contract('BoomerangPresaleTokenLockupTests2', function ([_, owner, beneficiary]) {

  const amount = new BigNumber(100)

  var token;

  beforeEach(async function () {
    token = await BoomerangToken.new({from: owner})
  })

  describe('construction', async () => {

     it('should not allow to initialize with null token contract address', async () => {
        await expectRevert(BoomerangPresaleTokenLockup.new(null, beneficiary));
     });

     it('should not allow to initialize with 0 token contract address', async () => {
        await expectRevert(BoomerangPresaleTokenLockup.new(0, beneficiary));
     });

     it('should not allow to initialize with null beneficiary address', async () => {
       await expectRevert(BoomerangPresaleTokenLockup.new(token.address, null));
     });

     it('should not allow to initialize with 0 beneficiary address', async () => {
       await expectRevert(BoomerangPresaleTokenLockup.new(token.address, 0));
     });
  });

})
