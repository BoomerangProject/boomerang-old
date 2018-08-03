pragma solidity ^0.4.24;

import './BoomerangActor.sol';
import './rewards/BoomerangRewards.sol';

contract BoomerangRateExperience is BoomerangActor, BoomerangRewards {

  event BoomerangExperienceRating(  address indexed _userAddress,
                          address indexed _workerAddress,
                          address indexed _businessAddress,
                          uint256 _workerRating,
                          uint256 _businessRating,
                          bytes32 _ipfsHash);

    // add: 'withCorrectSignature(_businessAddress, _userId, _v, _r, _s)'
  //                            uint8 _v, bytes32 _r, bytes32 _s, bytes32 _userId,

  function rateBoomerangExperience(  address _userAddress,
                            address _workerAddress,
                            address _businessAddress,
                            uint256 _workerRating,
                            uint256 _businessRating,
                            bytes32 _ipfsHash)
  public {

    emit Debug('workerRating: ', _workerRating);
    emit Debug('businessRating: ', _businessRating);

    updateWorkerRating(_workerAddress, _businessAddress, _workerRating);
    updateBusinessRating(_businessAddress, _businessRating);

    rewardWorker(_workerAddress, _businessAddress, _workerRating);

    updateUserRewardProgress(_userAddress, _businessAddress);
    updateWorkerRewardProgress(_workerAddress, _businessAddress, _workerRating);
    updateGrowthPoolRewardProgress(_userAddress, _workerAddress, _businessAddress, _workerRating);

    emit BoomerangExperienceRating(_userAddress, _workerAddress, _businessAddress, _workerRating, _businessRating, _ipfsHash);
  }

  function updateBusinessRating(address _businessAddress, uint256 _businessRating) internal {

    if (_businessRating < 1 || _businessRating > 5) {
      return;
    }

    numberOfBusinessRatings[_businessAddress] += 1;
    businessRatingsSum[_businessAddress] += _businessRating;
  }

  function updateWorkerRating(address _workerAddress, address _businessAddress, uint256 _workerRating) internal {

    if (_workerRating < 1 || _workerRating > 5) {
      return;
    }

    numberOfWorkerRatings[_businessAddress][_workerAddress] += 1;
    workerRatingsSum[_businessAddress][_workerAddress] += _workerRating;
  }
}