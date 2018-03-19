pragma solidity ^0.4.18;

contract KudosActor {

  // business
  mapping(address => bool) public isBusiness;

  mapping(address => uint256) public businessAverageRating;
  mapping(address => uint256) public numberOfBusinessRatings;

  mapping(address => mapping(address => bool)) public isEmployee;
  mapping(address => address[]) public employeeList;

  mapping(address => mapping(bytes32 => uint256)) public nonce;

  // worker
  mapping(address => mapping(address => uint256)) public workerAverageRating;
  mapping(address => mapping(address => uint256)) public numberOfWorkerRatings;
  mapping(address => mapping(address => bool)) public isEmployer;


  // user
  mapping(address => uint256) public userAverageRating;
  mapping(address => uint256) public numberOfUserRatings;


}