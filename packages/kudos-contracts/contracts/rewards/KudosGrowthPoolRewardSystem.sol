pragma solidity ^0.4.24;

import './KudosRewardSystem.sol';

contract KudosGrowthPoolRewardSystem is KudosRewardSystem {

  event RegisterGrowthPoolRewardSystem();
  event GrowthPoolReward(address indexed _workerAddress, address indexed _businessAddress, uint256 _rewardValue);

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

    incrementRewardProgress(growthPoolRewardSystem, _userAddress);

    if (_workerRating == 5) {
      incrementRewardProgress(growthPoolRewardSystem, _workerAddress);
    }

    incrementRewardProgress(growthPoolRewardSystem, _businessAddress);
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