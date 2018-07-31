pragma solidity ^0.4.24;

import './BoomerangRewardSystem.sol';

contract BoomerangUserRewardSystem is BoomerangRewardSystem {

  event RegisterUserRewardSystem(address indexed _businessAddress);
  event LoyaltyReward(address indexed _userAddress, address indexed _businessAddress, uint256 _rewardValue);

  mapping(address => RewardSystem) public userRewardSystem;

  function registerUserRewardSystem(address _businessAddress, uint256 _numberOfRewardSteps, uint256[] _numberOfRewardCyclesForLevel, uint256 _numberOfRewardLevels, uint256[] _levelRewards, bytes32 _ipfsHash) public {

    userRewardSystem[_businessAddress] = RewardSystem(_numberOfRewardSteps, _numberOfRewardCyclesForLevel, _numberOfRewardLevels, _levelRewards, _ipfsHash);
    emit RegisterUserRewardSystem(_businessAddress);
  }

  function updateUserRewardProgress(address _userAddress, address _businessAddress) internal {

    RewardSystem storage rewardSystem = userRewardSystem[_businessAddress];
    uint256 userRewardLevel = rewardSystem.rewardLevel[_userAddress];

    incrementRewardProgress(rewardSystem, _userAddress);

    if (rewardSystem.rewardStep[_userAddress] == 0) {
      uint256 rewardValue = rewardSystem.levelRewards[userRewardLevel];
      boomerangToken.transferFrom(_businessAddress, _userAddress, rewardValue);
      emit LoyaltyReward(_userAddress, _businessAddress, rewardValue);
    }
  }

  function getUserRewardSystem(address _businessAddress) public view returns (uint256 _numberOfRewardSteps, uint256[] _numberOfRewardCyclesForLevel, uint256 _numberOfRewardLevels, uint256[] _levelRewards, bytes32 _ipfsHash) {

    RewardSystem memory rewardSystem = userRewardSystem[_businessAddress];

    _numberOfRewardSteps = rewardSystem.numberOfRewardSteps;
    _numberOfRewardCyclesForLevel = rewardSystem.numberOfRewardCyclesForLevel;
    _numberOfRewardLevels = rewardSystem.numberOfRewardLevels;
    _levelRewards = rewardSystem.levelRewards;
    _ipfsHash = rewardSystem.ipfsHash;
  }

  function getUserRewardStep(address _userAddress, address _businessAddress) public view returns (uint256 _rewardStep) {

    RewardSystem storage rewardSystem = userRewardSystem[_businessAddress];
    _rewardStep = rewardSystem.rewardStep[_userAddress];
  }

  function getUserRewardCycle(address _userAddress, address _businessAddress) public view returns (uint256 _rewardCycle) {

    RewardSystem storage rewardSystem = userRewardSystem[_businessAddress];
    _rewardCycle = rewardSystem.rewardCycle[_userAddress];
  }

  function getUserRewardLevel(address _userAddress, address _businessAddress) public view returns (uint256 _rewardLevel) {

    RewardSystem storage rewardSystem = userRewardSystem[_businessAddress];
    _rewardLevel = rewardSystem.rewardLevel[_userAddress];
  }

  function getUserRewardRank(address _userAddress, address _businessAddress) public view returns (uint256 _rewardRank) {

    RewardSystem storage rewardSystem = userRewardSystem[_businessAddress];
    _rewardRank = rewardSystem.rewardRank[_userAddress];
  }
}