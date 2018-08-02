pragma solidity ^0.4.24;

contract BoomerangActor {

  // business
  mapping(address => bool) public isBusiness;

  mapping(address => mapping(address => bool)) public businessHasApprovedWorker;
  mapping(address => address[]) public workerList;

  // worker
  mapping(address => bool) public isWorker;

  mapping(address => mapping(address => bool)) public workerHasApprovedBusiness;
  mapping(address => address[]) public businessList;

  // user
  mapping(address => bool) public isUser;

  // business + worker
  mapping(address => mapping(address => bool)) public isEmployed;

  // ratings
  mapping(address => uint256) public businessRatingsSum;
  mapping(address => uint256) public numberOfBusinessRatings;

  mapping(address => mapping(address => uint256)) public workerRatingsSum;
  mapping(address => mapping(address => uint256)) public numberOfWorkerRatings;

  mapping(address => uint256) public userRatingsSum;
  mapping(address => uint256) public numberOfUserRatings;

//  mapping(address => mapping(bytes32 => uint256)) public nonce;
}