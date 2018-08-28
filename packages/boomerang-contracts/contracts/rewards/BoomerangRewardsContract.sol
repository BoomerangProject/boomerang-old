pragma solidity ^0.4.24;
//pragma experimental ABIEncoderV2;

import './BoomerangRewardsImpl.sol';
import '../../../boomerang-token-contracts/contracts/ERC20Token.sol';

contract BoomerangRewardsContract is BoomerangRewardsImpl {

  constructor(address _boomerangAuthContractAddress, address _boomerangTokenContractAddress) public {
    boomerangAuth = BoomerangAuth(_boomerangAuthContractAddress);
    boomerangToken = ERC20Token(_boomerangTokenContractAddress);
  }
}