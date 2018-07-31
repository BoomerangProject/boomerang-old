pragma solidity ^0.4.24;

import "./SafeMath.sol";
import './BoomerangToken.sol';

/**
 * @title BoomerangPresaleTokenLockup
 * @author Ben Johnson
 *
 * @dev BoomerangPresaleTokenLockup will allow a beneficiary to extract the tokens on 11/15/2017 at 9 AM EST
 * @dev Based on TokenTimelock by OpenZeppelin: https://github.com/OpenZeppelin/zeppelin-solidity
 */
contract BoomerangPresaleTokenLockup {
   using SafeMath for uint256;

   BoomerangToken boomerangToken;

   // beneficiary of tokens after they are released
   address public beneficiary;

   // timestamp when token release is enabled
   uint256 public releaseTime;

   constructor(address _tokenContractAddress, address _beneficiary) public {
      require(_tokenContractAddress != address(0));
      require(_beneficiary != address(0));
      releaseTime = 1510754400;
      boomerangToken = BoomerangToken(_tokenContractAddress);
      beneficiary = _beneficiary;
   }

   /**
   * @notice Transfers tokens held by timelock to beneficiary.
   */
   function release() public {
      require(now >= releaseTime);

      uint256 balance = boomerangToken.balanceOf(this);
      require(balance > 0);

      assert(boomerangToken.transfer(beneficiary, balance));
   }

   function fundsAreAvailable() public view returns (bool) {
      return now >= releaseTime;
   }
}
