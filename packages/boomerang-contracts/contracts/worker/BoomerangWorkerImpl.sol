pragma solidity ^0.4.24;
//pragma experimental ABIEncoderV2;

import './BoomerangWorker.sol';
import '../authorization/BoomerangAuth.sol';
import '../business/BoomerangBusiness.sol';

contract BoomerangWorkerImpl is BoomerangWorker {

  // interfaces
  BoomerangAuth public boomerangAuth;
  BoomerangBusiness public boomerangBusiness;

  // events
  event WorkerProfileUpdated(address indexed _workerAddress, bytes32 _ipfsHash);
  event WorkerHasApprovedBusiness(address indexed _workerAddress, address indexed _businessAddress);

  event UserRating( address indexed _userAddress,
                    address indexed _workerAddress,
                    address indexed _businessAddress,
                    uint256 _userRating,
                    bytes32 _ipfsHash);

  // state
  mapping(address => mapping(address => bool)) public hasApprovedBusinessMapping;
  mapping(address => mapping(address => uint256)) public ratingsSum;
  mapping(address => mapping(address => uint256)) public numberOfRatings;

  mapping(address => bool) public isWorker;
  mapping(address => address[]) public businessList;
  mapping(address => mapping(address => bool)) public isEmployedMapping;

  // methods
  function registerAsWorker(address _workerAddress, bytes32 _ipfsHash) public {

    require(isWorker[_workerAddress] == false);
    isWorker[_workerAddress] = true;
    emit WorkerProfileUpdated(_workerAddress, _ipfsHash);
  }

  function updateWorkerProfile( address _workerAddress,
                                bytes32 _ipfsHash,
                                uint8 _v,
                                bytes32 _r,
                                bytes32 _s) public {

    boomerangAuth.verify(_workerAddress, _v, _r, _s);
    emit WorkerProfileUpdated(_workerAddress, _ipfsHash);
  }

  function addBusiness( address _workerAddress,
                        address _businessAddress,
                        uint8 _v,
                        bytes32 _r,
                        bytes32 _s) public {

    boomerangAuth.verify(_workerAddress, _v, _r, _s);
    hasApprovedBusinessMapping[_workerAddress][_businessAddress] = true;
    emit WorkerHasApprovedBusiness(_workerAddress, _businessAddress);

    if (boomerangBusiness.hasApprovedWorker(_workerAddress, _businessAddress) && isNotEmployed(_workerAddress, _businessAddress)) {
      boomerangBusiness.addToWorkerList(_workerAddress, _businessAddress);
    }
  }

//  function rateUser(  address _userAddress,
//                      address _workerAddress,
//                      address _businessAddress,
//                      uint256 _userRating,
//                      bytes32 _ipfsHash,
//                      uint8 _v,
//                      bytes32 _r,
//                      bytes32 _s) public {
//
//    boomerangAuth.verify(_workerAddress, _v, _r, _s);
//
//    if (_userRating < 1 || _userRating > 5) {
//      return;
//    }
//
//    numberOfUserRatings[_userAddress] += 1;
//    userRatingsSum[_userAddress] += _userRating;
//    emit UserRating(_userAddress, _workerAddress, _businessAddress, _userRating, _ipfsHash);
//  }

  function getRatingsSum(address _workerAddress, address _businessAddress) public view returns (uint256 _ratingsSum) {
    return ratingsSum[_businessAddress][_workerAddress];
  }

  function updateRatingsSum(address _workerAddress, address _businessAddress, uint256 _newWorkerRating) public {
    ratingsSum[_businessAddress][_workerAddress] += _newWorkerRating;
  }

  function getNumberOfRatings(address _workerAddress, address _businessAddress) public view returns (uint256 _numberOfRatings) {
    return numberOfRatings[_businessAddress][_workerAddress];
  }

  function incrementNumberOfRatings(address _workerAddress, address _businessAddress) public {
    numberOfRatings[_businessAddress][_workerAddress] += 1;
  }

  function setWorkerAsEmployed(address _workerAddress, address _businessAddress) public {
    isEmployedMapping[_businessAddress][_workerAddress] = true;
  }

  function setWorkerAsUnemployed(address _workerAddress, address _businessAddress) public {
    isEmployedMapping[_businessAddress][_workerAddress] = false;
  }

  function hasApprovedBusiness(address _workerAddress, address _businessAddress) public view returns (bool _businessHasBeenApproved) {
    return hasApprovedBusinessMapping[_businessAddress][_workerAddress];
  }

  function isNotEmployed(address _workerAddress, address _businessAddress) public view returns (bool _isNotEmployed) {
    return !isEmployedMapping[_businessAddress][_workerAddress];
  }
}