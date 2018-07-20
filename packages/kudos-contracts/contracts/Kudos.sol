pragma solidity ^0.4.24;

import './KudosUser.sol';
import './KudosWorker.sol';
import './KudosBusiness.sol';
import './KudosRateExperience.sol';
import './KudosRewards.sol';

contract Kudos is KudosUser, KudosWorker, KudosBusiness, KudosRateExperience {

  constructor(address _tokenContractAddress) public {
    kudosToken = ERC20Token(_tokenContractAddress);
  }
}