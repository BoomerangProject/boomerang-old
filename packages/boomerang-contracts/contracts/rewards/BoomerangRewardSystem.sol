pragma solidity ^0.4.24;
//pragma experimental ABIEncoderV2;

import '../Ownable.sol';
import "../../../boomerang-token-contracts/contracts/SafeMath.sol";
import '../../../boomerang-token-contracts/contracts/ERC20Token.sol';

contract BoomerangRewardSystem is Ownable {
  using SafeMath for uint256;

  ERC20Token public boomerangToken;
  event Debug(string _id, uint256 _arg);

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

  function incrementRewardProgress(RewardSystem storage _rewardSystem, address _address) internal {

    uint256 nextRewardStep = _rewardSystem.rewardStep[_address] + 1;

    if (nextRewardStep == _rewardSystem.numberOfRewardSteps) {

      _rewardSystem.rewardStep[_address] = 0;
      uint256 nextRewardCycle = _rewardSystem.rewardCycle[_address] + 1;

      uint256 currentRewardLevel = _rewardSystem.rewardLevel[_address];
      if (nextRewardCycle == _rewardSystem.numberOfRewardCyclesForLevel[currentRewardLevel]) {

        _rewardSystem.rewardCycle[_address] = 0;
        uint256 nextRewardLevel = _rewardSystem.rewardLevel[_address] + 1;

          if (nextRewardLevel == _rewardSystem.numberOfRewardLevels) {

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
}
