pragma solidity ^0.4.24;
//pragma experimental ABIEncoderV2;

import './BoomerangRewardSystemImpl.sol';

contract BoomerangWorkerRewardSystemImpl is BoomerangRewardSystemImpl {

  event RegisterWorkerRewardSystem(address indexed _businessAddress);
  event PerformanceReward(address indexed _workerAddress, address indexed _businessAddress, uint256 _rewardValue);

  mapping(address => RewardSystem) public workerRewardSystem;

  function registerWorkerRewardSystem(address _businessAddress,
                                      uint256 _numberOfRewardSteps,
                                      uint256[] _numberOfRewardCyclesForLevel,
                                      uint256 _numberOfRewardLevels,
                                      uint256[] _levelRewards,
                                      bytes32 _ipfsHash,
                                      uint8 _v,
                                      bytes32 _r,
                                      bytes32 _s) public {

    boomerangAuth.verify(_businessAddress, _v, _r, _s);
    workerRewardSystem[_businessAddress] = RewardSystem(_numberOfRewardSteps, _numberOfRewardCyclesForLevel, _numberOfRewardLevels, _levelRewards, _ipfsHash);
    emit RegisterWorkerRewardSystem(_businessAddress);
  }

  function updateWorkerRewardProgress(address _workerAddress, address _businessAddress, uint256 _workerRating) public {

    if (_workerRating != 5) {
      return;
    }

    RewardSystem storage rewardSystem = workerRewardSystem[_businessAddress];
    uint256 workerRewardLevel = rewardSystem.rewardLevel[_workerAddress];
    incrementRewardProgress(rewardSystem, _workerAddress);

    if (rewardSystem.rewardStep[_workerAddress] == 0) {
      uint256 rewardValue = rewardSystem.levelRewards[workerRewardLevel];
      boomerangToken.transferFrom(_businessAddress, _workerAddress, rewardValue);
      emit PerformanceReward(_workerAddress, _businessAddress, rewardValue);
    }
  }

  function getWorkerRewardSystem(address _businessAddress) public view returns (uint256 _numberOfRewardSteps, uint256[] _numberOfRewardCyclesForLevel, uint256 _numberOfRewardLevels, uint256[] _levelRewards, bytes32 _ipfsHash) {

    RewardSystem memory rewardSystem = workerRewardSystem[_businessAddress];

    _numberOfRewardSteps = rewardSystem.numberOfRewardSteps;
    _numberOfRewardCyclesForLevel = rewardSystem.numberOfRewardCyclesForLevel;
    _numberOfRewardLevels = rewardSystem.numberOfRewardLevels;
    _levelRewards = rewardSystem.levelRewards;
    _ipfsHash = rewardSystem.ipfsHash;
  }

  function getWorkerRewardStep(address _workerAddress, address _businessAddress) public view returns (uint256 _rewardStep) {

    RewardSystem storage rewardSystem = workerRewardSystem[_businessAddress];
    _rewardStep = rewardSystem.rewardStep[_workerAddress];
  }

  function getWorkerRewardCycle(address _workerAddress, address _businessAddress) public view returns (uint256 _rewardCycle) {

    RewardSystem storage rewardSystem = workerRewardSystem[_businessAddress];
    _rewardCycle = rewardSystem.rewardCycle[_workerAddress];
  }

  function getWorkerRewardLevel(address _workerAddress, address _businessAddress) public view returns (uint256 _rewardLevel) {

    RewardSystem storage rewardSystem = workerRewardSystem[_businessAddress];
    _rewardLevel = rewardSystem.rewardLevel[_workerAddress];
  }

  function getWorkerRewardRank(address _workerAddress, address _businessAddress) public view returns (uint256 _rewardRank) {

    RewardSystem storage rewardSystem = workerRewardSystem[_businessAddress];
    _rewardRank = rewardSystem.rewardRank[_workerAddress];
  }
}