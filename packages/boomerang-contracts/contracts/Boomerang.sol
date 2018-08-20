pragma solidity ^0.4.24;
//pragma experimental ABIEncoderV2;

import './BoomerangUser.sol';
import './BoomerangWorker.sol';
import './BoomerangBusiness.sol';
import './BoomerangRateExperience.sol';

contract Boomerang is BoomerangUser, BoomerangWorker, BoomerangBusiness, BoomerangRateExperience {

  constructor(address _tokenContractAddress) public {
    boomerangToken = ERC20Token(_tokenContractAddress);
  }

  address public updatedContractAddress;

  function setUpdatedContractAddress(address _updatedContractAddress) public onlyOwner {
    updatedContractAddress = _updatedContractAddress;
  }
}