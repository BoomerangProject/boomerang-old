pragma solidity ^0.4.18;

contract KudosActor {

  // business
  mapping(address => bool) public isBusiness;

  mapping(address => mapping(address => bool)) public businessHasApprovedWorker;
  mapping(address => address[]) public employeeList;

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



//  mapping(address => mapping(bytes32 => uint256)) public nonce;
}
