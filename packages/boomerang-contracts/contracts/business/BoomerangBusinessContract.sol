pragma solidity ^0.4.24;
//pragma experimental ABIEncoderV2;

import './BoomerangBusinessImpl.sol';
import '../Ownable.sol';

contract BoomerangBusinessContract is BoomerangBusinessImpl, Ownable {

  constructor(address _boomerangAuthContractAddress) public {
    boomerangAuth = BoomerangAuth(_boomerangAuthContractAddress);
  }

  function updateWorkerContract(address _boomerangWorkerContractAddress) public onlyOwner {
    boomerangWorker = BoomerangWorker(_boomerangWorkerContractAddress);
  }
}