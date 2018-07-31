pragma solidity ^0.4.24;

import './BoomerangUserRewardSystem.sol';
import './BoomerangWorkerRewardSystem.sol';
import './BoomerangGrowthPoolRewardSystem.sol';

contract BoomerangRewards is BoomerangUserRewardSystem, BoomerangWorkerRewardSystem, BoomerangGrowthPoolRewardSystem {

  mapping(address => uint256[5]) public ratingRewardPercentages;

  function rewardWorker(address _workerAddress, address _businessAddress, uint256 _workerRating) internal {

    uint256[5] storage ratingRewardPercentageValues = ratingRewardPercentages[_businessAddress];
    uint256 rewardValue = ratingRewardPercentageValues[4] * ratingRewardPercentageValues[_workerRating-1] / 100;
    boomerangToken.transferFrom(_businessAddress, _workerAddress, rewardValue);
  }
}