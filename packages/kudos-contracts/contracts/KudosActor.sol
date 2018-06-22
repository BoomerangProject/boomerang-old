pragma solidity ^0.4.18;

contract KudosActor {

  // business
  mapping(address => bool) public isBusiness;

  mapping(address => mapping(address => bool)) public businessHasApprovedWorker;
  mapping(address => address[]) public workerList;

  function getNumberOfWorkers(address businessAddress) public constant returns(uint count) {
    return workerList[businessAddress].length;
  }

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


  // rewards

  // businessAddress => userId => rewardStep
  mapping(address => mapping(bytes32 => uint256)) public workerRewardStep;

 // businessAddress => userId => rewardCycle
  mapping(address => mapping(bytes32 => uint256)) public workerRewardCycle;

  // businessAddress => userId => rewardLevel
  mapping(address => mapping(bytes32 => uint256)) public workerRewardLevel;


  // businessAddress => numberOfRewardSteps
  mapping(address => uint256) public numberOfRewardSteps;

  // businessAddress => numberOfRewardCycles
  mapping(address => uint256) public numberOfRewardCycles;

  // businessAddress => numberOfRewardLevels
  mapping(address => uint256) public numberOfRewardLevels;

  // businessAddress => rewardLevel => reward
  mapping(address => mapping(uint256 => uint256)) public workerReward;
}
