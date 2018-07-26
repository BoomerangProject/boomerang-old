pragma solidity ^0.4.24;

import './KudosActor.sol';
import './rewards/KudosRewards.sol';

contract KudosRateExperience is KudosActor, KudosRewards {

  event KudosExperience(  address indexed _userAddress,
                          address indexed _workerAddress,
                          address indexed _businessAddress,
                          uint256 _workerRating,
                          uint256 _businessRating,
                          bytes32 _ipfsHash);

    // add: 'withCorrectSignature(_businessAddress, _userId, _v, _r, _s)'
  //                            uint8 _v, bytes32 _r, bytes32 _s, bytes32 _userId,

  function rateExperience(  address _userAddress,
                            address _workerAddress,
                            address _businessAddress,
                            uint256 _workerRating,
                            uint256 _businessRating,
                            bytes32 _ipfsHash)
  public {

    if (_businessRating > 0 && _businessRating < 6) {
      updateBusinessRating(_businessAddress, _businessRating);
    }

    if (_workerRating > 0 && _workerRating < 6) {
      updateWorkerRating(_workerAddress, _businessAddress, _workerRating);
    }

    rewardWorker(_workerAddress, _businessAddress, _workerRating);

    updateUserRewardProgress(_userAddress, _businessAddress);
    updateWorkerRewardProgress(_workerAddress, _businessAddress, _workerRating);
    updateGrowthPoolRewardProgress(_userAddress, _workerAddress, _businessAddress, _workerRating);

    emit KudosExperience(_userAddress, _workerAddress, _businessAddress, _workerRating, _businessRating, _ipfsHash);
  }

  function updateBusinessRating(address _businessAddress, uint256 _businessRating) internal {

    numberOfBusinessRatings[_businessAddress] += 1;
    businessAverageRating[_businessAddress] = (businessAverageRating[_businessAddress] + _businessRating) / numberOfBusinessRatings[_businessAddress];
  }

  function updateWorkerRating(address _workerAddress, address _businessAddress, uint256 _workerRating) internal {

    numberOfWorkerRatings[_businessAddress][_workerAddress] += 1;
    workerAverageRating[_businessAddress][_workerAddress] = (workerAverageRating[_businessAddress][_workerAddress] + _workerRating) / numberOfWorkerRatings[_businessAddress][_workerAddress];
  }










//    modifier withCorrectSignatureFromBusiness(address _businessAddress, bytes32 _userId, uint8 _v, bytes32 _r, bytes32 _s) {
//
//      bytes32 nonceHash = keccak256(nonce[_businessAddress][_userId]);
//      bytes memory prefix = '\x19Ethereum Signed Message:\n32';
//      bytes32 prefixedHash = keccak256(prefix, nonceHash);
//      address recoveredAddress = ecrecover(prefixedHash, _v, _r, _s);
//
//      require(recoveredAddress == _businessAddress);
//      incrementNonce(_businessAddress, _userId);
//      _;
//    }
//
//    function incrementNonce(address _businessAddress, bytes32 _userId) internal {
//      nonce[_businessAddress][_userId] += 1;
//    }
}