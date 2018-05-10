pragma solidity ^0.4.18;

import "./KudosActor.sol";

contract KudosWorker is KudosActor {

  event WorkerHasApprovedBusiness(address indexed _workerAddress, address indexed _businessAddress);

  event UserRating( address indexed _userAddress,
                    address indexed _workerAddress,
                    address indexed _businessAddress,
                    uint256 _userRating,
                    bytes32 _ipfsHash);

  function addBusiness(address _workerAddress, address _businessAddress) public {

    workerHasApprovedBusiness[_workerAddress][_businessAddress] = true;
    WorkerHasApprovedBusiness(_workerAddress, _businessAddress);

    if (businessHasApprovedWorker[_businessAddress][_workerAddress] && !isEmployed[_businessAddress][_workerAddress]) {
      isEmployed[_businessAddress][_workerAddress] = true;
      workerList[_businessAddress].push(_workerAddress);
      isWorker[_workerAddress] = true;
    }

    // any add business init
  }

  function rateUser(address _userAddress, address _workerAddress, address _businessAddress, uint256 _userRating, bytes32 _ipfsHash) public {

    numberOfUserRatings[_userAddress] += 1;
    userAverageRating[_userAddress] = (userAverageRating[_userAddress] + _userRating) / numberOfUserRatings[_userAddress];
    UserRating(_businessAddress, _workerAddress, _userAddress, _userRating, _ipfsHash);
  }
}