pragma solidity ^0.4.24;

import './BoomerangActor.sol';
import './rewards/BoomerangRewards.sol';

contract BoomerangRateExperience is BoomerangActor, BoomerangRewards {

  // businessAddress => userAddress => nonceValueForNewRating
  mapping(address => mapping(address => uint256)) public nonceValueForNewRating;

  function getNonceValueForNewRating(address _businessAddress, address _userAddress) public view returns (uint256 _nonceValue) {
    _nonceValue = nonceValueForNewRating[_businessAddress][_userAddress];
  }

  event DebugBoolean(string arg, bool something);

  event BoomerangExperienceRating(  address indexed _userAddress,
                          address indexed _workerAddress,
                          address indexed _businessAddress,
                          uint256 _workerRating,
                          uint256 _businessRating,
                          bytes32 _ipfsHash);

  function rateBoomerangExperience( address _userAddress,
                            address _workerAddress,
                            address _businessAddress,
                            uint256 _workerRating,
                            uint256 _businessRating,
                            bytes32 _ipfsHash,
                            uint8 _v,
                            bytes32 _r,
                            bytes32 _s)
  public {

    onlyAuthorizedUser(_userAddress, _businessAddress, _v, _r, _s);

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

  function onlyAuthorizedUser(address _userAddress, address _businessAddress, uint8 _v, bytes32 _r, bytes32 _s) internal {

    bytes32 nonceHash = keccak256(abi.encodePacked(_userAddress, nonceValueForNewRating[_businessAddress][_userAddress]));
    bytes memory prefix = '\x19Ethereum Signed Message:\n32';
    bytes32 prefixedHash = keccak256(abi.encodePacked(prefix, nonceHash));
    address recoveredAddress = ecrecover(prefixedHash, _v, _r, _s);
    require(recoveredAddress == _businessAddress);

    nonceValueForNewRating[_businessAddress][_userAddress] += 1;
  }
}