pragma solidity ^0.4.18;

import "./KudosActor.sol";

contract KudosUser is KudosActor {

  event BusinessRating( address indexed _businessAddress,
                        address indexed _userAddress,
                        uint256 _businessRating,
                        bytes32 _ipfsHash);

  event WorkerRating( address indexed _businessAddress,
                      address indexed _workerAddress,
                      address indexed _userAddress,
                      uint256 _workerRating,
                      bytes32 _ipfsHash);

  // add: "withCorrectSignature(_businessAddress, _userId, _v, _r, _s)"
  function rateExperience(  address _userAddress,
                            uint8 _v, bytes32 _r, bytes32 _s, bytes32 _userId,
                            address _businessAddress,
                            uint256 _businessRating,
                            address _workerAddress,
                            uint256 _workerRating,
                            bytes32 _transactionHash)
  public {

    recordBusinessRating(_businessAddress, _userAddress, _businessRating, _transactionHash);
    recordWorkerRating(_businessAddress, _workerAddress, _userAddress, _workerRating, _transactionHash);
  }

  function recordBusinessRating(address _userAddress, address _businessAddress, uint256 _businessRating, bytes32 _transactionHash) internal {

    if (_businessRating < 1 || _businessRating > 5) {
      revert();
    }

    numberOfBusinessRatings[_businessAddress] += 1;
    businessAverageRating[_businessAddress] = (businessAverageRating[_businessAddress] + _businessRating) / numberOfBusinessRatings[_businessAddress];
    BusinessRating(_businessAddress, _userAddress, _businessRating, _transactionHash);
  }

  function recordWorkerRating(address _userAddress, address _businessAddress, address _workerAddress, uint256 _workerRating, bytes32 _transactionHash) internal {

    if (_workerRating < 1 || _workerRating > 5) {
      revert();
    }

    numberOfWorkerRatings[_businessAddress][_workerAddress] += 1;
    workerAverageRating[_businessAddress][_workerAddress] = (workerAverageRating[_businessAddress][_workerAddress] + _workerRating) / numberOfWorkerRatings[_businessAddress][_workerAddress];
    WorkerRating(_businessAddress, _workerAddress, _userAddress, _workerRating, _transactionHash);
  }



    modifier withCorrectSignatureFromBusiness(address _businessAddress, bytes32 _userId, uint8 _v, bytes32 _r, bytes32 _s) {

      bytes32 nonceHash = keccak256(nonce[_businessAddress][_userId]);
      bytes memory prefix = "\x19Ethereum Signed Message:\n32";
      bytes32 prefixedHash = keccak256(prefix, nonceHash);
      address recoveredAddress = ecrecover(prefixedHash, _v, _r, _s);

      require(recoveredAddress == _businessAddress);
      incrementNonce(_businessAddress, _userId);
      _;
    }

    function incrementNonce(address _businessAddress, bytes32 _userId) internal {
      nonce[_businessAddress][_userId] += 1;
    }
}

