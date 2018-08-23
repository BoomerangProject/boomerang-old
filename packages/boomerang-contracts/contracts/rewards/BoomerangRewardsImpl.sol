pragma solidity ^0.4.24;
//pragma experimental ABIEncoderV2;

import './BoomerangUserRewardSystemImpl.sol';
import './BoomerangWorkerRewardSystemImpl.sol';
import './BoomerangGrowthPoolRewardSystemImpl.sol';

contract BoomerangRewardsImpl is BoomerangUserRewardSystemImpl, BoomerangWorkerRewardSystemImpl, BoomerangGrowthPoolRewardSystemImpl {

  mapping(address => uint256[5]) public ratingRewards;
  event WorkerReward(address indexed _workerAddress, address indexed _businessAddress, uint256 _workerRating, uint256 _rewardValue);

  function rewardWorker(address _workerAddress, address _businessAddress, uint256 _workerRating) public {

    uint256[5] storage rewardValues = ratingRewards[_businessAddress];
    uint256 rewardValue = rewardValues[_workerRating-1];

    if (rewardValue == 0) {
      return;
    }

    boomerangToken.transferFrom(_businessAddress, _workerAddress, rewardValue);
    emit WorkerReward(_workerAddress, _businessAddress, _workerRating, rewardValue);
  }

  function setRatingRewards(address _businessAddress,
                            uint256[5] _ratingRewards,
                            uint8 _v,
                            bytes32 _r,
                            bytes32 _s) public {

    boomerangAuth.verify(_businessAddress, _v, _r, _s);
    ratingRewards[_businessAddress] = _ratingRewards;
  }

  function getRatingRewards(address _businessAddress) public view returns (uint256[5] _ratingRewards) {
    _ratingRewards = ratingRewards[_businessAddress];
  }
}