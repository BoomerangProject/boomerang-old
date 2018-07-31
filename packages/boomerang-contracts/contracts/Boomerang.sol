pragma solidity ^0.4.24;

import './BoomerangUser.sol';
import './BoomerangWorker.sol';
import './BoomerangBusiness.sol';
import './BoomerangRateExperience.sol';

contract Boomerang is BoomerangUser, BoomerangWorker, BoomerangBusiness, BoomerangRateExperience {

  constructor(address _tokenContractAddress) public {
    boomerangToken = ERC20Token(_tokenContractAddress);
  }
}