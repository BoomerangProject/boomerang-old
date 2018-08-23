pragma solidity ^0.4.24;
//pragma experimental ABIEncoderV2;

contract BoomerangWorker {

  function registerAsWorker(address _workerAddress, bytes32 _ipfsHash) public;

  function updateWorkerProfile( address _workerAddress,
                                bytes32 _ipfsHash,
                                uint8 _v,
                                bytes32 _r,
                                bytes32 _s) public;

  function addBusiness( address _workerAddress,
                        address _businessAddress,
                        uint8 _v,
                        bytes32 _r,
                        bytes32 _s) public;

//  function rateUser(  address _userAddress,
//                      address _workerAddress,
//                      address _businessAddress,
//                      uint256 _userRating,
//                      bytes32 _ipfsHash,
//                      uint8 _v,
//                      bytes32 _r,
//                      bytes32 _s) public;

  function getRatingsSum(address _workerAddress, address _businessAddress) public view returns (uint256 _ratingsSum);
  function updateRatingsSum(address _workerAddress, address _businessAddress, uint256 _newWorkerRating) public;
  function getNumberOfRatings(address _workerAddress, address _businessAddress) public view returns (uint256 _numberOfRatings);
  function incrementNumberOfRatings(address _workerAddress, address _businessAddress) public;

  function setWorkerAsEmployed(address _workerAddress, address _businessAddress) public;
  function setWorkerAsUnemployed(address _workerAddress, address _businessAddress) public;

  function hasApprovedBusiness(address _workerAddress, address _businessAddress) public view returns (bool _businessHasBeenApproved);
  function isNotEmployed(address _workerAddress, address _businessAddress) public view returns (bool _isNotEmployed);
}