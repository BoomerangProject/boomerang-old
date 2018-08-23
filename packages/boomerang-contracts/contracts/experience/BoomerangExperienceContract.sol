pragma solidity ^0.4.24;
//pragma experimental ABIEncoderV2;

import './BoomerangExperienceImpl.sol';
import '../worker/BoomerangWorker.sol';
import '../business/BoomerangBusiness.sol';
import '../rewards/BoomerangRewards.sol';

contract BoomerangExperienceContract is BoomerangExperienceImpl {

  constructor(address _boomerangWorkerContractAddress, address _boomerangBusinessContractAddress, address _boomerangRewardsContractAddress) public {
    boomerangWorker = BoomerangWorker(_boomerangWorkerContractAddress);
    boomerangBusiness = BoomerangBusiness(_boomerangBusinessContractAddress);
    boomerangRewards = BoomerangRewards(_boomerangRewardsContractAddress);
  }

//  address public updatedContractAddress;
//
//  function setUpdatedContractAddress(address _updatedContractAddress) external onlyOwner {
//    updatedContractAddress = _updatedContractAddress;
//  }
}