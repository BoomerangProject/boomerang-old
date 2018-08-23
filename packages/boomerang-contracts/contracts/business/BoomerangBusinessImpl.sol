pragma solidity ^0.4.24;
//pragma experimental ABIEncoderV2;

import './BoomerangBusiness.sol';
import '../authorization/BoomerangAuth.sol';
import '../worker/BoomerangWorker.sol';

contract BoomerangBusinessImpl is BoomerangBusiness {

  // interfaces
  BoomerangAuth public boomerangAuth;
  BoomerangWorker public boomerangWorker;

  // events
  event BusinessProfileUpdated(address indexed _businessAddress, bytes32 _ipfsHash);
  event BusinessHasApprovedWorker(address indexed _businessAddress, address indexed _workerAddress);

  // state
  mapping(address => uint256) public ratingsSum;
  mapping(address => uint256) public numberOfRatings;

  mapping(address => mapping(address => bool)) public hasApprovedWorkerMapping;
  mapping(address => address[]) public workerList;
  mapping(address => bool) public isBusiness;


  // methods
  function registerAsBusiness(address _businessAddress, bytes32 _ipfsHash) public{

    require(isBusiness[_businessAddress] == false);
    isBusiness[_businessAddress] = true;
    emit BusinessProfileUpdated(_businessAddress, _ipfsHash);
  }

  function updateBusinessProfile( address _businessAddress,
                                  bytes32 _ipfsHash,
                                  uint8 _v,
                                  bytes32 _r,
                                  bytes32 _s) public {

    boomerangAuth.verify(_businessAddress, _v, _r, _s);
    emit BusinessProfileUpdated(_businessAddress, _ipfsHash);
  }

  function addWorker( address _workerAddress,
                      address _businessAddress,
                      uint8 _v,
                      bytes32 _r,
                      bytes32 _s) public {

    boomerangAuth.verify(_businessAddress, _v, _r, _s);
    hasApprovedWorkerMapping[_businessAddress][_workerAddress] = true;
    emit BusinessHasApprovedWorker(_businessAddress, _workerAddress);

    if (boomerangWorker.hasApprovedBusiness(_workerAddress, _businessAddress) && boomerangWorker.isNotEmployed(_workerAddress, _businessAddress)) {
      addToWorkerList(_workerAddress, _businessAddress);
    }
  }

  // remove worker

  function getEmployeeAddress(address _businessAddress, uint _index) public view returns (address) {
    return workerList[_businessAddress][_index];
  }

  function numberOfEmployees(address _businessAddress) public view returns (uint256) {
    return workerList[_businessAddress].length;
  }

  function getNumberOfWorkers(address businessAddress) public view returns(uint count) {
    return workerList[businessAddress].length;
  }

  function getRatingsSum(address _businessAddress) public view returns (uint256 _ratingsSum) {
    return ratingsSum[_businessAddress];
  }

  function updateRatingsSum(address _businessAddress, uint256 _newBusinessRating) public {
    ratingsSum[_businessAddress] += _newBusinessRating;
  }

  function getNumberOfRatings(address _businessAddress) public view returns (uint256 _numberOfRatings) {
    return numberOfRatings[_businessAddress];
  }

  function incrementNumberOfRatings(address _businessAddress) public {
    numberOfRatings[_businessAddress] += 1;
  }

  function hasApprovedWorker(address _workerAddress, address _businessAddress) public view returns (bool _workerHasBeenApproved) {
    return hasApprovedWorkerMapping[_businessAddress][_workerAddress];
  }

  function addToWorkerList(address _workerAddress, address _businessAddress) public {
    boomerangWorker.setWorkerAsEmployed(_workerAddress, _businessAddress);
    workerList[_businessAddress].push(_workerAddress);
  }

/*
  mapping(bytes32 => bool) boomerangExperienceWasRated;

  event BoomerangExperience(  address indexed _userAddress,
                              address indexed _workerAddress,
                              address indexed _businessAddress,
                              bytes32 _ipfsHash);

  function boomerangExperience(  address _userAddress,
                                 address _workerAddress,
                                 address _businessAddress,
                                 bytes32 _ipfsHash) public {

    emit BoomerangExperience(_userAddress, _workerAddress, _businessAddress, _ipfsHash);
  }
 */
}