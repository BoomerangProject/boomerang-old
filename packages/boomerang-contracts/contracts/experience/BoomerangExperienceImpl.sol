pragma solidity ^0.4.24;
//pragma experimental ABIEncoderV2;

import '../rewards/BoomerangRewards.sol';
import '../worker/BoomerangWorker.sol';
import '../business/BoomerangBusiness.sol';
import './BoomerangExperience.sol';

contract BoomerangExperienceImpl is BoomerangExperience {

  // interfaces
  BoomerangWorker public boomerangWorker;
  BoomerangBusiness public boomerangBusiness;
  BoomerangRewards public boomerangRewards;

  // events
  event BoomerangExperienceRating(  address indexed _userAddress,
                                    address indexed _workerAddress,
                                    address indexed _businessAddress,
                                    uint256 _workerRating,
                                    uint256 _businessRating,
                                    bytes32 _ipfsHash);
  // state
  // businessAddress => userAddress => nonceValueForNewRating
  mapping(address => mapping(address => uint256)) public nonceValueForNewRating;

  // methods
  function getNonceValueForNewRating(address _businessAddress, address _userAddress) public view returns (uint256 _nonceValue) {
    _nonceValue = nonceValueForNewRating[_businessAddress][_userAddress];
  }

  function rate(  address _userAddress,
                  address _workerAddress,
                  address _businessAddress,
                  uint256 _workerRating,
                  uint256 _businessRating,
                  bytes32 _ipfsHash,
                  uint8 _v,
                  bytes32 _r,
                  bytes32 _s) public {

    onlyAuthorizedReviewer(_userAddress, _businessAddress, _v, _r, _s);

    updateWorkerRating(_workerAddress, _businessAddress, _workerRating);
    updateBusinessRating(_businessAddress, _businessRating);

    boomerangRewards.rewardWorker(_workerAddress, _businessAddress, _workerRating);

    boomerangRewards.updateUserRewardProgress(_userAddress, _businessAddress);
    boomerangRewards.updateWorkerRewardProgress(_workerAddress, _businessAddress, _workerRating);
    boomerangRewards.updateGrowthPoolRewardProgress(_userAddress, _workerAddress, _businessAddress, _workerRating);

    emit BoomerangExperienceRating(_userAddress, _workerAddress, _businessAddress, _workerRating, _businessRating, _ipfsHash);
  }

  function updateBusinessRating(address _businessAddress, uint256 _businessRating) public {

    if (_businessRating < 1 || _businessRating > 5) {
      return;
    }

    boomerangBusiness.incrementNumberOfRatings(_businessAddress);
    boomerangBusiness.updateRatingsSum(_businessAddress, _businessRating);
  }

  function updateWorkerRating(address _workerAddress, address _businessAddress, uint256 _workerRating) internal {

    if (_workerRating < 1 || _workerRating > 5) {
      return;
    }

    boomerangWorker.incrementNumberOfRatings(_workerAddress, _businessAddress);
    boomerangWorker.updateRatingsSum(_workerAddress, _businessAddress, _workerRating);
  }

  function onlyAuthorizedReviewer(address _userAddress, address _businessAddress, uint8 _v, bytes32 _r, bytes32 _s) private {

    bytes32 nonceHash = keccak256(abi.encodePacked(_userAddress, nonceValueForNewRating[_businessAddress][_userAddress]));
    bytes memory prefix = '\x19Ethereum Signed Message:\n32';
    bytes32 prefixedHash = keccak256(abi.encodePacked(prefix, nonceHash));
    address recoveredAddress = ecrecover(prefixedHash, _v, _r, _s);
    require(recoveredAddress == _businessAddress);

    nonceValueForNewRating[_businessAddress][_userAddress] += 1;
  }
}