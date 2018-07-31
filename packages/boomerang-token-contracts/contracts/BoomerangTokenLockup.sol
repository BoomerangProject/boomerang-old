pragma solidity ^0.4.24;

import "./SafeMath.sol";
import './BoomerangToken.sol';

/**
 * @title BoomerangTokenLockup
 * @author Ben Johnson
 *
 * @dev BoomerangTokenLockup is a token holder contract that will allow a beneficiary to extract the tokens after a year
 * @dev Based on TokenTimelock by OpenZeppelin: https://github.com/OpenZeppelin/zeppelin-solidity
 */
contract BoomerangTokenLockup {
   using SafeMath for uint256;

   BoomerangToken boomerangToken;

   // beneficiary of tokens after they are released
   address public beneficiary;

   // timestamp when token release is enabled
   uint256 public releaseTime;

   constructor(address _tokenContractAddress, address _beneficiary) public {
      require(_tokenContractAddress != address(0));
      require(_beneficiary != address(0));
      releaseTime = now.add(365 days);
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
