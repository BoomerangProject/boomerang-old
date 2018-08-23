pragma solidity ^0.4.24;
//pragma experimental ABIEncoderV2;

contract BoomerangBusiness {

  function registerAsBusiness(address _businessAddress, bytes32 _ipfsHash) public;

  function updateBusinessProfile( address _businessAddress,
                                  bytes32 _ipfsHash,
                                  uint8 _v,
                                  bytes32 _r,
                                  bytes32 _s) public;

  function addWorker( address _workerAddress,
                      address _businessAddress,
                      uint8 _v,
                      bytes32 _r,
                      bytes32 _s) public;

  function getEmployeeAddress(address _businessAddress, uint _index) public view returns (address);
  function numberOfEmployees(address _businessAddress) public view returns (uint256);
  function getNumberOfWorkers(address businessAddress) public view returns(uint count);
  function getRatingsSum(address _businessAddress) public view returns (uint256 _ratingsSum);
  function updateRatingsSum(address _businessAddress, uint256 _newBusinessRating) public;
  function getNumberOfRatings(address _businessAddress) public view returns (uint256 _numberOfRatings);
  function incrementNumberOfRatings(address _businessAddress) public;
  function hasApprovedWorker(address _workerAddress, address _businessAddress) public view returns (bool _workerHasBeenApproved);
  function addToWorkerList(address _workerAddress, address _businessAddress) public;
}