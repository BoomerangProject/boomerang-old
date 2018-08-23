pragma solidity ^0.4.24;
//pragma experimental ABIEncoderV2;

import './BoomerangUserImpl.sol';
import '../Ownable.sol';

contract BoomerangUserContract is BoomerangUserImpl, Ownable {

  constructor(address _boomerangAuthContractAddress) public {
    boomerangAuth = BoomerangAuth(_boomerangAuthContractAddress);
  }
}

