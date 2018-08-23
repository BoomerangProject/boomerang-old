pragma solidity ^0.4.24;
//pragma experimental ABIEncoderV2;

import './BoomerangRewardsImpl.sol';

contract BoomerangRewardsContract is BoomerangRewardsImpl {

  constructor(address _boomerangTokenContractAddress) public {
    boomerangAuth = ERC0(_boomerangAuthContractAddress);
  }
}