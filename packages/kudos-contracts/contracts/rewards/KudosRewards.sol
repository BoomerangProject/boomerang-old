pragma solidity ^0.4.24;

import './KudosUserRewardSystem.sol';
import './KudosWorkerRewardSystem.sol';
import './KudosGrowthPoolRewardSystem.sol';

contract KudosRewards is KudosUserRewardSystem, KudosWorkerRewardSystem, KudosGrowthPoolRewardSystem {

  mapping(address => uint256[5]) public ratingRewardPercentages;

  function rewardWorker(address _workerAddress, address _businessAddress, uint256 _workerRating) internal {

    uint256[5] storage ratingRewardPercentageValues = ratingRewardPercentages[_businessAddress];
    uint256 rewardValue = ratingRewardPercentageValues[4] * ratingRewardPercentageValues[_workerRating-1] / 100;
    kudosToken.transferFrom(_businessAddress, _workerAddress, rewardValue);
  }
}