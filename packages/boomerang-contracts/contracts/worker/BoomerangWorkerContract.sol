pragma solidity ^0.4.24;
//pragma experimental ABIEncoderV2;

import './BoomerangWorkerImpl.sol';
import '../Ownable.sol';

contract BoomerangWorkerContract is BoomerangWorkerImpl, Ownable {

  constructor(address _boomerangAuthContractAddress) public {
    boomerangAuth = BoomerangAuth(_boomerangAuthContractAddress);
  }

  function updateBusinessContract(address _boomerangBusinessContractAddress) public onlyOwner {
    boomerangBusiness = BoomerangBusiness(_boomerangBusinessContractAddress);
  }
}