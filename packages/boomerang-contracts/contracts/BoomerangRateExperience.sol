pragma solidity ^0.4.24;
//pragma experimental ABIEncoderV2;

import './BoomerangActor.sol';
import './rewards/BoomerangRewards.sol';

contract BoomerangRateExperience is BoomerangActor, BoomerangRewards {

  // businessAddress => userAddress => nonceValueForNewRating
  mapping(address => mapping(address => uint256)) public nonceValueForNewRating;

  function getNonceValueForNewRating(address _businessAddress, address _userAddress) public view returns (uint256 _nonceValue) {
    _nonceValue = nonceValueForNewRating[_businessAddress][_userAddress];
  }

  event DebugInt(string _id, uint8 _arg);
  event DebugBytes(string _id, string _arg);

  event BoomerangExperienceRating(  address indexed _userAddress,
                          address indexed _workerAddress,
                          address indexed _businessAddress,
                          uint256 _workerRating,
                          uint256 _businessRating,
                          bytes32 _ipfsHash);

  function test(address _userAddress, address _businessAddress, bytes32 _v, bytes32 _r, bytes32 _s) external {

//    emit DebugInt('a', uint8(signature[0]));

//    bytes32 someBytes = signature[0];
//    bytes32 someOtherBytes = bytes32(0xc25fe672ad9a174313135ca77d6e26eea15bdf73671ca0d397831226bd00f603);

    emit DebugInt('a', uint8(_v));
//    emit DebugInt('a', uint8(signature[0]));
//    emit DebugBytes('b', bytes32(signature[1]);
//    emit DebugBytes('c', signature[2]);


//    onlyAuthorizedReviewer(_userAddress, _businessAddress, uint8(_v), _r, _s);
  }

  function rateBoomerangExperience( address _userAddress,
                            address _workerAddress,
                            address _businessAddress,
                            uint256 _workerRating,
                            uint256 _businessRating,
                            bytes32 _ipfsHash,
                            Signature signature)
  public {

    onlyAuthorizedReviewer(_userAddress, _businessAddress, signature);

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

  function onlyAuthorizedReviewer(address _userAddress, address _businessAddress, Signature signature) internal {

    bytes32 nonceHash = keccak256(abi.encodePacked(_userAddress, nonceValueForNewRating[_businessAddress][_userAddress]));
    bytes memory prefix = '\x19Ethereum Signed Message:\n32';
    bytes32 prefixedHash = keccak256(abi.encodePacked(prefix, nonceHash));
    address recoveredAddress = ecrecover(prefixedHash, signature._v, signature._r, signature._s);
    require(recoveredAddress == _businessAddress);

    nonceValueForNewRating[_businessAddress][_userAddress] += 1;
  }
}