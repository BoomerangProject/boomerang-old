pragma solidity ^0.4.18;

import "./KudosActor.sol";

contract KudosBusiness is KudosActor {

  event BusinessProfileUpdated(address indexed _businessAddress, bytes32 _ipfsHash);
  event BusinessHasApprovedWorker(address indexed _businessAddress, address indexed _workerAddress);
  event RegisterWorkerRewardSystem(address indexed _businessAddress);

  function registerAsBusiness(address _businessAddress, bytes32 _ipfsHash) public {

    require(isBusiness[_businessAddress] == false);
    isBusiness[_businessAddress] = true;
    BusinessProfileUpdated(_businessAddress, _ipfsHash);
  }

  function updateBusinessProfile(address _businessAddress, bytes32 _ipfsHash) public {
    BusinessProfileUpdated(_businessAddress, _ipfsHash);
  }

  function addWorker(address _workerAddress, address _businessAddress) public {

    businessHasApprovedWorker[_businessAddress][_workerAddress] = true;
    BusinessHasApprovedWorker(_businessAddress, _workerAddress);

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

  struct RewardSystem {

    uint256 numberOfRewardSteps;
    uint256 numberOfRewardCycles;
    uint256 numberOfRewardLevels;

//    uint256[] levelRewards;
//    uint256[5] ratingRewards;
    bytes32 _ipfsHash;

    mapping(bytes32 => uint256) rewardStep;
    mapping(bytes32 => uint256) rewardCycle;
    mapping(bytes32 => uint256) rewardLevel;
    mapping(bytes32 => uint256) rewardRank;
  }

  mapping (address => RewardSystem) workerRewardSystem;

//  function registerWorkerRewardSystem(address _businessAddress, uint256 _numberOfRewardSteps, uint256 _numberOfRewardCycles, uint256 _numberOfRewardLevels, uint256[] _levelRewards, uint256[5] _ratingRewards, bytes32 _ipfsHash) public {
  function registerWorkerRewardSystem(address _businessAddress, uint256 _numberOfRewardSteps, uint256 _numberOfRewardCycles, uint256 _numberOfRewardLevels, bytes32 _ipfsHash) public {

//    workerRewardSystem[_businessAddress] = RewardSystem(_numberOfRewardSteps, _numberOfRewardCycles, _numberOfRewardLevels, _levelRewards, _ratingRewards, _ipfsHash);
    workerRewardSystem[_businessAddress] = RewardSystem(_numberOfRewardSteps, _numberOfRewardCycles, _numberOfRewardLevels, _ipfsHash);
    RegisterWorkerRewardSystem(_businessAddress);
  }
}