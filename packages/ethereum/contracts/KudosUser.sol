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

  modifier withCorrectSignature(address _businessAddress, address _workerAddress, uint8 _v, bytes32 _r, bytes32 _s) {

    bytes32 nonceHash = sha3(nonce[_businessAddress][_workerAddress][msg.sender]);
    bytes memory prefix = "\x19Ethereum Signed Message:\n32";
    bytes32 prefixedHash = sha3(prefix, nonceHash);
    address recoveredAddress = ecrecover(prefixedHash, _v, _r, _s);

    require(recoveredAddress == _businessAddress);
    incrementNonce(_businessAddress, _workerAddress);
    _;
  }

  function incrementNonce(address _businessAddress, address _workerAddress) internal {
    nonce[_businessAddress][_workerAddress][msg.sender] += 1;
  }

  function rateExperience(  uint8 _v, bytes32 _r, bytes32 _s,
                            address _businessAddress,
                            uint256 _businessRating,
                            address _workerAddress,
                            uint256 _workerRating,
                            bytes32 _transactionHash)
           withCorrectSignature(_businessAddress, _workerAddress, _v, _r, _s)
  public {

    recordBusinessRating(_businessAddress, _businessRating, _transactionHash);
    recordWorkerRating(_businessAddress, _workerAddress, _workerRating, _transactionHash);
  }

  function recordBusinessRating(address _businessAddress, uint256 _businessRating, bytes32 _transactionHash) internal {

    if (_businessRating > 0 && _businessRating < 6) {
      numberOfBusinessRatings[_businessAddress] += 1;
      businessAverageRating[_businessAddress] = (businessAverageRating[_businessAddress] + _businessRating) / numberOfBusinessRatings[_businessAddress];
      BusinessRating(_businessAddress, msg.sender, _businessRating, _transactionHash);
    }
  }

  function recordWorkerRating(address _businessAddress, address _workerAddress, uint256 _workerRating, bytes32 _transactionHash) internal {

    if (_workerRating > 0 && _workerRating < 6) {
      numberOfWorkerRatings[_businessAddress][_workerAddress] += 1;
      workerAverageRating[_businessAddress][_workerAddress] = (workerAverageRating[_businessAddress][_workerAddress] + _workerRating) / numberOfWorkerRatings[_businessAddress][_workerAddress];
      WorkerRating(_businessAddress, _workerAddress, msg.sender, _workerRating, _transactionHash);
    }
  }
}

