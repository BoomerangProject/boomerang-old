pragma solidity ^0.4.24;

import './BoomerangRewardSystem.sol';

contract BoomerangGrowthPoolRewardSystem is BoomerangRewardSystem {

  event RegisterGrowthPoolRewardSystem();
  event GrowthPoolRewardForUser(address indexed _userAddress, uint256 _rewardValue);
  event GrowthPoolRewardForWorker(address indexed _workerAddress, uint256 _rewardValue);
  event GrowthPoolRewardForBusiness(address indexed _businessAddress, uint256 _rewardValue);

  RewardSystem public growthPoolRewardSystem;
  mapping (address => bool) public growthPoolBusiness;

  function registerGrowthPoolRewardSystem(uint256 _numberOfRewardSteps, uint256[] _numberOfRewardCyclesForLevel, uint256 _numberOfRewardLevels, uint256[] _levelRewards, bytes32 _ipfsHash) public onlyOwner {

    growthPoolRewardSystem = RewardSystem(_numberOfRewardSteps, _numberOfRewardCyclesForLevel, _numberOfRewardLevels, _levelRewards, _ipfsHash);
    emit RegisterGrowthPoolRewardSystem();
  }

  function updateGrowthPoolRewardProgress(address _userAddress, address _workerAddress, address _businessAddress, uint256 _workerRating) internal {

    if (growthPoolBusiness[_businessAddress] == false) {
      return;
    }

    updateGrowthPoolRewardProgressForUser(_userAddress);
//
//    if (_workerRating == 5) {
//      updateGrowthPoolRewardProgressForWorker(_workerAddress);
//    }
//
//    updateGrowthPoolRewardProgressForBusiness(_businessAddress);
  }

  function updateGrowthPoolRewardProgressForUser(address _userAddress) internal {

    uint256 userRewardLevel = growthPoolRewardSystem.rewardLevel[_userAddress];
    incrementRewardProgress(growthPoolRewardSystem, _userAddress);

    if (growthPoolRewardSystem.rewardStep[_userAddress] == 0) {
      uint256 rewardValue = growthPoolRewardSystem.levelRewards[userRewardLevel];
      boomerangToken.transferFrom(owner, _userAddress, rewardValue);
      emit GrowthPoolRewardForUser(_userAddress, rewardValue);
    }
  }

  function updateGrowthPoolRewardProgressForUser2(address _userAddress) internal {

    uint256 userRewardLevel = growthPoolRewardSystem.rewardLevel[_userAddress];
    incrementRewardProgress(growthPoolRewardSystem, _userAddress);

    if (growthPoolRewardSystem.rewardStep[_userAddress] == 0) {
      uint256 rewardValue = growthPoolRewardSystem.levelRewards[userRewardLevel];
      boomerangToken.transferFrom(owner, _userAddress, rewardValue);
      emit GrowthPoolRewardForUser(_userAddress, rewardValue);
    }
  }
  function updateGrowthPoolRewardProgressForWorker(address _workerAddress) internal {

    uint256 workerRewardLevel = growthPoolRewardSystem.rewardLevel[_workerAddress];
    incrementRewardProgress(growthPoolRewardSystem, _workerAddress);

    if (growthPoolRewardSystem.rewardStep[_workerAddress] == 0) {
      uint256 rewardValue = growthPoolRewardSystem.levelRewards[workerRewardLevel];
      boomerangToken.transferFrom(owner, _workerAddress, rewardValue);
      emit GrowthPoolRewardForWorker(_workerAddress, rewardValue);
    }
  }

  function updateGrowthPoolRewardProgressForBusiness(address _businessAddress) internal {

    uint256 businessRewardLevel = growthPoolRewardSystem.rewardLevel[_businessAddress];
    incrementRewardProgress(growthPoolRewardSystem, _businessAddress);

    if (growthPoolRewardSystem.rewardStep[_businessAddress] == 0) {
      uint256 rewardValue = growthPoolRewardSystem.levelRewards[businessRewardLevel];
      boomerangToken.transferFrom(owner, _businessAddress, rewardValue);
      emit GrowthPoolRewardForBusiness(_businessAddress, rewardValue);
    }
  }

   function addBusinessesToGrowthPoolRewardsSystem(address[] businesses) external onlyOwner {
      for (uint i = 0; i < businesses.length; i++) {
         growthPoolBusiness[businesses[i]] = true;
      }
   }

   function removeBusinessesFromGrowthPoolRewardsSystem(address[] businesses) external onlyOwner {
      for (uint i = 0; i < businesses.length; i++) {
         growthPoolBusiness[businesses[i]] = false;
      }
   }

  function getGrowthPoolRewardSystem() public view returns (uint256 _numberOfRewardSteps, uint256[] _numberOfRewardCyclesForLevel, uint256 _numberOfRewardLevels, uint256[] _levelRewards, bytes32 _ipfsHash) {

    _numberOfRewardSteps = growthPoolRewardSystem.numberOfRewardSteps;
    _numberOfRewardCyclesForLevel = growthPoolRewardSystem.numberOfRewardCyclesForLevel;
    _numberOfRewardLevels = growthPoolRewardSystem.numberOfRewardLevels;
    _levelRewards = growthPoolRewardSystem.levelRewards;
    _ipfsHash = growthPoolRewardSystem.ipfsHash;
  }

  function getGrowthPoolRewardStep(address _address) public view returns (uint256 _rewardStep) {

    _rewardStep = growthPoolRewardSystem.rewardStep[_address];
  }

  function getGrowthPoolRewardCycle(address _address) public view returns (uint256 _rewardCycle) {

    _rewardCycle = growthPoolRewardSystem.rewardCycle[_address];
  }

  function getGrowthPoolRewardLevel(address _address) public view returns (uint256 _rewardLevel) {

    _rewardLevel = growthPoolRewardSystem.rewardLevel[_address];
  }

  function getGrowthPoolRewardRank(address _address) public view returns (uint256 _rewardRank) {

    _rewardRank = growthPoolRewardSystem.rewardRank[_address];
  }
}