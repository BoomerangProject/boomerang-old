pragma solidity ^0.4.24;

contract BoomerangActor {

  // business
  mapping(address => bool) public isBusiness;

  mapping(address => mapping(address => bool)) public businessHasApprovedWorker;
  mapping(address => address[]) public workerList;

  mapping(address => uint256) public businessAverageRating;
  mapping(address => uint256) public numberOfBusinessRatings;

  // worker
  mapping(address => bool) public isWorker;

  mapping(address => mapping(address => bool)) public workerHasApprovedBusiness;
  mapping(address => address[]) public businessList;

  mapping(address => mapping(address => uint256)) public workerAverageRating;
  mapping(address => mapping(address => uint256)) public numberOfWorkerRatings;

  // user
  mapping(address => uint256) public userAverageRating;
  mapping(address => uint256) public numberOfUserRatings;

  mapping(address => bool) public isUser;

  // business + worker
  mapping(address => mapping(address => bool)) public isEmployed;

//  mapping(address => mapping(bytes32 => uint256)) public nonce;
}
