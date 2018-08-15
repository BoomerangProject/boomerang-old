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

  function rateBoomerangExperience( address _userAddress,
                            address _workerAddress,
                            address _businessAddress,
                            uint256 _workerRating,
                            uint256 _businessRating,
                            bytes32 _ipfsHash,
                            uint8 _v,
                            bytes32 _r,
                            bytes32 _s)
           onlyAuthorizedUser(_userAddress, _businessAddress, _v, _r, _s)
  public {

    emit Debug('workerRating: ', _workerRating);
    emit Debug('businessRating: ', _businessRating);

    updateWorkerRating(_workerAddress, _businessAddress, _workerRating);
    updateBusinessRating(_businessAddress, _businessRating);

    rewardWorker(_workerAddress, _businessAddress, _workerRating);

//    updateUserRewardProgress(_userAddress, _businessAddress);
//    updateWorkerRewardProgress(_workerAddress, _businessAddress, _workerRating);
//    updateGrowthPoolRewardProgress(_userAddress, _workerAddress, _businessAddress, _workerRating);

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

  // businessAddress => userAddress => nonceValueForNewRating
  mapping(address => mapping(address => uint256)) public nonceValueForNewRating;

  function getNonceValueForNewRating(address _businessAddress, address _userAddress) public view returns (uint256 _nonceValue) {
    _nonceValue = nonceValueForNewRating[_businessAddress][_userAddress];
  }

  modifier onlyAuthorizedUser(address _userAddress, address _businessAddress, uint8 _v, bytes32 _r, bytes32 _s) {

  /**/
  // this line:

      require(ecrecover(keccak256(abi.encodePacked('\x19Ethereum Signed Message:\n32', keccak256(abi.encodePacked(_userAddress, nonceValueForNewRating[_businessAddress][_userAddress])))), _v, _r, _s) == _businessAddress);

  // is equivalent to:
  //
//      bytes32 nonceHash = keccak256(abi.encodePacked(_userAddress, nonceValueForNewRating[_businessAddress][_userAddress]));
//      bytes memory prefix = '\x19Ethereum Signed Message:\n32';
//      bytes32 prefixedHash = keccak256(abi.encodePacked(prefix, nonceHash));
//      address recoveredAddress = ecrecover(prefixedHash, _v, _r, _s);
//      require(recoveredAddress == _userAddress);
  //
  /*/*
  // unfortunately this isneeded to fix the following error:
  //    "CompilerError: Stack too deep, try removing local variables."
  /**/

    nonceValueForNewRating[_businessAddress][_userAddress] += 1;
    _;
  }
}