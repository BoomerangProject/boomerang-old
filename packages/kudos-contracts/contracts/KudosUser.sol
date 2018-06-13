pragma solidity ^0.4.18;

import "./KudosActor.sol";

contract KudosUser is KudosActor {

  event RegisteredAsUser(address indexed _userAddress, bytes32 _ipfsHash);
  event KudosExperience(  address indexed _userAddress,
                          address indexed _workerAddress,
                          address indexed _businessAddress,
                          uint256 _workerRating,
                          uint256 _businessRating,
                          bytes32 _ipfsHash);

  // add: "withCorrectSignature(_businessAddress, _userId, _v, _r, _s)"
//                            uint8 _v, bytes32 _r, bytes32 _s, bytes32 _userId,

  function rateExperience(  address _userAddress,
                            address _workerAddress,
                            address _businessAddress,
                            uint256 _workerRating,
                            uint256 _businessRating,
                            bytes32 _ipfsHash)
  public {

    if (_businessRating >= 0 || _businessRating <= 5) {
      updateBusinessRating(_businessAddress, _businessRating);
    }

    if (_workerRating >= 0 || _workerRating <= 5) {
      updateWorkerRating(_workerAddress, _businessAddress, _workerRating);
    }

    KudosExperience(_userAddress, _workerAddress, _businessAddress, _workerRating, _businessRating, _ipfsHash);
  }


  function registerAsUser(address _userAddress, bytes32 _ipfsHash) public {

    RegisteredAsUser(_userAddress, _ipfsHash);
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
//      bytes memory prefix = "\x19Ethereum Signed Message:\n32";
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

