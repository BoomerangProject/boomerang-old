pragma solidity ^0.4.24;

contract KudosRewards {

  struct RewardSystem {

    uint256 numberOfRewardSteps;
    uint256 numberOfRewardCycles;
    uint256 numberOfRewardLevels;

    uint256[] levelRewards;
    uint256[5] ratingRewards;
    bytes32 ipfsHash;

    mapping(bytes32 => uint256) rewardStep;
    mapping(bytes32 => uint256) rewardCycle;
    mapping(bytes32 => uint256) rewardLevel;
    mapping(bytes32 => uint256) rewardRank;
  }

  mapping(address => RewardSystem) public userRewardSystem;
  mapping(address => RewardSystem) public workerRewardSystem;
  RewardSystem public growthPoolRewardSystem;

  event RegisterUserRewardSystem(address indexed _businessAddress);
  event RegisterWorkerRewardSystem(address indexed _businessAddress);
  event RegisterGrowthPoolRewardSystem();

  function registerUserRewardSystem(address _businessAddress, uint256 _numberOfRewardSteps, uint256 _numberOfRewardCycles, uint256 _numberOfRewardLevels, uint256[] _levelRewards, bytes32 _ipfsHash) public {

    uint256[5] memory emptyRatingRewards;
    userRewardSystem[_businessAddress] = RewardSystem(_numberOfRewardSteps, _numberOfRewardCycles, _numberOfRewardLevels, _levelRewards, emptyRatingRewards, _ipfsHash);
    emit RegisterUserRewardSystem(_businessAddress);
  }

  function registerWorkerRewardSystem(address _businessAddress, uint256 _numberOfRewardSteps, uint256 _numberOfRewardCycles, uint256 _numberOfRewardLevels, uint256[] _levelRewards, uint256[5] _ratingRewards, bytes32 _ipfsHash) public {

    workerRewardSystem[_businessAddress] = RewardSystem(_numberOfRewardSteps, _numberOfRewardCycles, _numberOfRewardLevels, _levelRewards, _ratingRewards, _ipfsHash);
    emit RegisterWorkerRewardSystem(_businessAddress);
  }

//  function updateUserRewardProgress() internal pure {
//  }
//
//  function updateWorkerRewardProgress() internal pure {
//
//  }
//
//  function updateGrowthPoolProgress(address _userAddress, address _workerAddress, address _businessAddress) internal pure {
//
//  }
//
//  function transferRewardFromBusinessPool(address _businessAddress, address _recipient) internal pure {
//
//  }
//
//  function transferRewardFromGrowthPool(address _businessAddress, address _recipient) internal pure {
//
//  }

  // getters
  function getUserRewardSystem(address _businessAddress) public view returns (uint256 _numberOfRewardSteps, uint256 _numberOfRewardCycles, uint256 _numberOfRewardLevels, uint256[] _levelRewards, uint256[5] _ratingRewards, bytes32 _ipfsHash) {

    RewardSystem memory rewardSystem = userRewardSystem[_businessAddress];

    _numberOfRewardSteps = rewardSystem.numberOfRewardSteps;
    _numberOfRewardCycles = rewardSystem.numberOfRewardCycles;
    _numberOfRewardLevels = rewardSystem.numberOfRewardLevels;
    _levelRewards = rewardSystem.levelRewards;
    _ratingRewards = rewardSystem.ratingRewards;
    _ipfsHash = rewardSystem.ipfsHash;
  }

  function getWorkerRewardSystem(address _businessAddress) public view returns (uint256 _numberOfRewardSteps, uint256 _numberOfRewardCycles, uint256 _numberOfRewardLevels, uint256[] _levelRewards, uint256[5] _ratingRewards, bytes32 _ipfsHash) {

    RewardSystem memory rewardSystem = workerRewardSystem[_businessAddress];

    _numberOfRewardSteps = rewardSystem.numberOfRewardSteps;
    _numberOfRewardCycles = rewardSystem.numberOfRewardCycles;
    _numberOfRewardLevels = rewardSystem.numberOfRewardLevels;
    _levelRewards = rewardSystem.levelRewards;
    _ratingRewards = rewardSystem.ratingRewards;
    _ipfsHash = rewardSystem.ipfsHash;
  }
}
