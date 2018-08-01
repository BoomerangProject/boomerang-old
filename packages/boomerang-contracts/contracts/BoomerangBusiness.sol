pragma solidity ^0.4.24;

import './BoomerangActor.sol';

contract BoomerangBusiness is BoomerangActor {

  event BusinessProfileUpdated(address indexed _businessAddress, bytes32 _ipfsHash);
  event BusinessHasApprovedWorker(address indexed _businessAddress, address indexed _workerAddress);

  function registerAsBusiness(address _businessAddress, bytes32 _ipfsHash) public {

    require(isBusiness[_businessAddress] == false);
    isBusiness[_businessAddress] = true;
    emit BusinessProfileUpdated(_businessAddress, _ipfsHash);
  }

  function updateBusinessProfile(address _businessAddress, bytes32 _ipfsHash) public {
    emit BusinessProfileUpdated(_businessAddress, _ipfsHash);
  }

  function addWorker(address _workerAddress, address _businessAddress) public {

    businessHasApprovedWorker[_businessAddress][_workerAddress] = true;
    emit BusinessHasApprovedWorker(_businessAddress, _workerAddress);

    if (workerHasApprovedBusiness[_workerAddress][_businessAddress] && !isEmployed[_businessAddress][_workerAddress]) {
      isEmployed[_businessAddress][_workerAddress] = true;
      workerList[_businessAddress].push(_workerAddress);
      isWorker[_workerAddress] = true;
    }
  }

  function getEmployeeAddress(address _businessAddress, uint _index) public view returns (address) {
    return workerList[_businessAddress][_index];
  }

  function numberOfEmployees(address _businessAddress) public view returns (uint256) {
    return workerList[_businessAddress].length;
  }

  function getNumberOfWorkers(address businessAddress) public view returns(uint count) {
    return workerList[businessAddress].length;
  }

  function getBusinessRatingsSum(address _businessAddress) public view returns (uint256 _businessRatingsSum) {
    return businessRatingsSum[_businessAddress];
  }

  function getNumberOfBusinessRatings(address _businessAddress) public view returns (uint256 _numberOfBusinessRatings) {
    return numberOfBusinessRatings[_businessAddress];
  }
}