pragma solidity ^0.4.24;
//pragma experimental ABIEncoderV2;

import '../Ownable.sol';

contract BoomerangRewards is Ownable {

  // rating rewards
  function setRatingRewards(address _businessAddress,
                            uint256[5] _ratingRewards,
                            uint8 _v,
                            bytes32 _r,
                            bytes32 _s) public;

  function rewardWorker(address _workerAddress, address _businessAddress, uint256 _workerRating) public;
  function getRatingRewards(address _businessAddress) public view returns (uint256[5] _ratingRewards);


  // user reward system
  function registerUserRewardSystem(address _businessAddress,
                                    uint256 _numberOfRewardSteps,
                                    uint256[] _numberOfRewardCyclesForLevel,
                                    uint256 _numberOfRewardLevels,
                                    uint256[] _levelRewards,
                                    bytes32 _ipfsHash,
                                    uint8 _v,
                                    bytes32 _r,
                                    bytes32 _s) public;

  function updateUserRewardProgress(address _userAddress, address _businessAddress) public;
  function getUserRewardSystem(address _businessAddress) public view returns (uint256 _numberOfRewardSteps, uint256[] _numberOfRewardCyclesForLevel, uint256 _numberOfRewardLevels, uint256[] _levelRewards, bytes32 _ipfsHash);
  function getUserRewardStep(address _userAddress, address _businessAddress) public view returns (uint256 _rewardStep);
  function getUserRewardCycle(address _userAddress, address _businessAddress) public view returns (uint256 _rewardCycle);
  function getUserRewardLevel(address _userAddress, address _businessAddress) public view returns (uint256 _rewardLevel);
  function getUserRewardRank(address _userAddress, address _businessAddress) public view returns (uint256 _rewardRank);


  // worker reward system
  function registerWorkerRewardSystem(address _businessAddress,
                                      uint256 _numberOfRewardSteps,
                                      uint256[] _numberOfRewardCyclesForLevel,
                                      uint256 _numberOfRewardLevels,
                                      uint256[] _levelRewards,
                                      bytes32 _ipfsHash,
                                      uint8 _v,
                                      bytes32 _r,
                                      bytes32 _s) public;

  function updateWorkerRewardProgress(address _workerAddress, address _businessAddress, uint256 _workerRating) public;

  function getWorkerRewardSystem(address _businessAddress) public view returns (uint256 _numberOfRewardSteps, uint256[] _numberOfRewardCyclesForLevel, uint256 _numberOfRewardLevels, uint256[] _levelRewards, bytes32 _ipfsHash);
  function getWorkerRewardStep(address _workerAddress, address _businessAddress) public view returns (uint256 _rewardStep);
  function getWorkerRewardCycle(address _workerAddress, address _businessAddress) public view returns (uint256 _rewardCycle);
  function getWorkerRewardLevel(address _workerAddress, address _businessAddress) public view returns (uint256 _rewardLevel);
  function getWorkerRewardRank(address _workerAddress, address _businessAddress) public view returns (uint256 _rewardRank);


  // growth pool reward system
  function registerGrowthPoolRewardSystem(uint256 _numberOfRewardSteps,
                                          uint256[] _numberOfRewardCyclesForLevel,
                                          uint256 _numberOfRewardLevels,
                                          uint256[] _levelRewards,
                                          bytes32 _ipfsHash) public;

  function updateGrowthPoolRewardProgress(address _userAddress, address _workerAddress, address _businessAddress, uint256 _workerRating) public;
  function updateGrowthPoolRewardProgress(string _type, address _address) public;
  function addBusinessesToGrowthPoolRewardsSystem(address[] businesses) external;
  function removeBusinessesFromGrowthPoolRewardsSystem(address[] businesses) external;
  function getGrowthPoolRewardSystem() public view returns (uint256 _numberOfRewardSteps, uint256[] _numberOfRewardCyclesForLevel, uint256 _numberOfRewardLevels, uint256[] _levelRewards, bytes32 _ipfsHash);
  function getGrowthPoolRewardStep(address _address) public view returns (uint256 _rewardStep);
  function getGrowthPoolRewardCycle(address _address) public view returns (uint256 _rewardCycle);
  function getGrowthPoolRewardLevel(address _address) public view returns (uint256 _rewardLevel);
  function getGrowthPoolRewardRank(address _address) public view returns (uint256 _rewardRank);
}