pragma solidity ^0.4.24;

import './Ownable.sol';
import "../../kudos-token-contracts/contracts/SafeMath.sol";
import '../../kudos-token-contracts/contracts/ERC20Token.sol';

contract KudosRewards is Ownable {
  using SafeMath for uint256;

  ERC20Token public kudosToken;
  uint256 internal constant tokenUnit = 10 ** 18;

  event RegisterUserRewardSystem(address indexed _businessAddress);
  event RegisterWorkerRewardSystem(address indexed _businessAddress);
  event RegisterGrowthPoolRewardSystem();

  struct RewardSystem {

    uint256 numberOfRewardSteps;
    uint256[] numberOfRewardCyclesForLevel;
    uint256 numberOfRewardLevels;

    uint256[] levelRewards;
    bytes32 ipfsHash;

    mapping(address => uint256) rewardStep;
    mapping(address => uint256) rewardCycle;
    mapping(address => uint256) rewardLevel;
    mapping(address => uint256) rewardRank;
  }

  mapping(address => RewardSystem) public userRewardSystem;
  mapping(address => RewardSystem) public workerRewardSystem;
  RewardSystem public growthPoolRewardSystem;

  mapping(address => uint256[5]) public ratingRewardPercentages;

  function rewardWorker(address _workerAddress, address _businessAddress, uint256 _workerRating) internal {

    uint256[5] storage ratingRewardPercentageValues = ratingRewardPercentages[_businessAddress];
    uint256 rewardValue = ratingRewardPercentageValues[4] * ratingRewardPercentageValues[_workerRating] / 100;
    kudosToken.transferFrom(_businessAddress, _workerAddress, rewardValue);
  }

  function registerUserRewardSystem(address _businessAddress, uint256 _numberOfRewardSteps, uint256[] _numberOfRewardCyclesForLevel, uint256 _numberOfRewardLevels, uint256[] _levelRewards, bytes32 _ipfsHash) public {

    userRewardSystem[_businessAddress] = RewardSystem(_numberOfRewardSteps, _numberOfRewardCyclesForLevel, _numberOfRewardLevels, _levelRewards, _ipfsHash);
    emit RegisterUserRewardSystem(_businessAddress);
  }

  function registerWorkerRewardSystem(address _businessAddress, uint256 _numberOfRewardSteps, uint256[] _numberOfRewardCyclesForLevel, uint256 _numberOfRewardLevels, uint256[] _levelRewards, bytes32 _ipfsHash) public {

    workerRewardSystem[_businessAddress] = RewardSystem(_numberOfRewardSteps, _numberOfRewardCyclesForLevel, _numberOfRewardLevels, _levelRewards, _ipfsHash);
    emit RegisterWorkerRewardSystem(_businessAddress);
  }

  function registerGrowthPoolRewardSystem(uint256 _numberOfRewardSteps, uint256[] _numberOfRewardCyclesForLevel, uint256 _numberOfRewardLevels, uint256[] _levelRewards, bytes32 _ipfsHash) public onlyOwner {

    growthPoolRewardSystem = RewardSystem(_numberOfRewardSteps, _numberOfRewardCyclesForLevel, _numberOfRewardLevels, _levelRewards, _ipfsHash);
    emit RegisterGrowthPoolRewardSystem();
  }

  function updateUserRewardProgress(address _userAddress, address _businessAddress) internal {

    RewardSystem storage rewardSystem = userRewardSystem[_businessAddress];
    incrementRewardProgress(rewardSystem, _userAddress);

    if (rewardSystem.rewardStep[_userAddress] == 0) {
      uint256 userRewardLevel = rewardSystem.rewardLevel[_userAddress];
      uint256 rewardValue = rewardSystem.levelRewards[userRewardLevel] * tokenUnit;
      kudosToken.transferFrom(_businessAddress, _userAddress, rewardValue);
    }
  }

  function updateWorkerRewardProgress(address _workerAddress, address _businessAddress, uint256 _workerRating) internal {

    if (_workerRating != 5) {
      return;
    }

    RewardSystem storage rewardSystem = workerRewardSystem[_businessAddress];
    incrementRewardProgress(rewardSystem, _workerAddress);

    if (rewardSystem.rewardStep[_workerAddress] == 0) {
      uint256 workerRewardLevel = rewardSystem.rewardLevel[_workerAddress];
      uint256 rewardValue = rewardSystem.levelRewards[workerRewardLevel] * tokenUnit;
      kudosToken.transferFrom(_businessAddress, _workerAddress, rewardValue);
    }
  }

  function updateGrowthPoolRewardProgress(address _userAddress, address _workerAddress, address _businessAddress, uint256 _workerRating) internal {

    incrementRewardProgress(growthPoolRewardSystem, _userAddress);

    if (_workerRating == 5) {
      incrementRewardProgress(growthPoolRewardSystem, _workerAddress);
    }

    incrementRewardProgress(growthPoolRewardSystem, _businessAddress);
  }

  function incrementRewardProgress(RewardSystem storage _rewardSystem, address _address) internal {

    uint256 nextRewardStep = _rewardSystem.rewardStep[_address] + 1;

    if (nextRewardStep > _rewardSystem.numberOfRewardSteps - 1) {

      _rewardSystem.rewardStep[_address] = 0;
      uint256 nextRewardCycle = _rewardSystem.rewardCycle[_address] + 1;

      uint256 currentRewardLevel = _rewardSystem.rewardLevel[_address];
      if (nextRewardCycle > _rewardSystem.numberOfRewardCyclesForLevel[currentRewardLevel] - 1) {

        _rewardSystem.rewardCycle[_address] = 0;
        uint256 nextRewardLevel = _rewardSystem.rewardLevel[_address] + 1;

          if (nextRewardLevel > _rewardSystem.numberOfRewardLevels - 1) {

            _rewardSystem.rewardLevel[_address] = 0;
            _rewardSystem.rewardRank[_address] += 1;

          } else {
            _rewardSystem.rewardLevel[_address] += 1;
          }

      } else {
        _rewardSystem.rewardCycle[_address] += 1;
      }

    } else {
      _rewardSystem.rewardStep[_address] += 1;
    }
  }

  // getters
  function getUserRewardSystem(address _businessAddress) public view returns (uint256 _numberOfRewardSteps, uint256[] _numberOfRewardCyclesForLevel, uint256 _numberOfRewardLevels, uint256[] _levelRewards, bytes32 _ipfsHash) {

    RewardSystem memory rewardSystem = userRewardSystem[_businessAddress];

    _numberOfRewardSteps = rewardSystem.numberOfRewardSteps;
    _numberOfRewardCyclesForLevel = rewardSystem.numberOfRewardCyclesForLevel;
    _numberOfRewardLevels = rewardSystem.numberOfRewardLevels;
    _levelRewards = rewardSystem.levelRewards;
    _ipfsHash = rewardSystem.ipfsHash;
  }

  function getWorkerRewardSystem(address _businessAddress) public view returns (uint256 _numberOfRewardSteps, uint256[] _numberOfRewardCyclesForLevel, uint256 _numberOfRewardLevels, uint256[] _levelRewards, bytes32 _ipfsHash) {

    RewardSystem memory rewardSystem = workerRewardSystem[_businessAddress];

    _numberOfRewardSteps = rewardSystem.numberOfRewardSteps;
    _numberOfRewardCyclesForLevel = rewardSystem.numberOfRewardCyclesForLevel;
    _numberOfRewardLevels = rewardSystem.numberOfRewardLevels;
    _levelRewards = rewardSystem.levelRewards;
    _ipfsHash = rewardSystem.ipfsHash;
  }

    function getGrowthPoolRewardSystem() public view returns (uint256 _numberOfRewardSteps, uint256[] _numberOfRewardCyclesForLevel, uint256 _numberOfRewardLevels, uint256[] _levelRewards, bytes32 _ipfsHash) {

      _numberOfRewardSteps = growthPoolRewardSystem.numberOfRewardSteps;
      _numberOfRewardCyclesForLevel = growthPoolRewardSystem.numberOfRewardCyclesForLevel;
      _numberOfRewardLevels = growthPoolRewardSystem.numberOfRewardLevels;
      _levelRewards = growthPoolRewardSystem.levelRewards;
      _ipfsHash = growthPoolRewardSystem.ipfsHash;
    }
}
