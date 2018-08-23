#!/bin/sh

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

function unify() {
	grep -v "^[pragma|import]" $DIR/$1 >> ~/Desktop/Boomerang.sol
}

echo "pragma solidity ^0.4.24;" > ~/Desktop/Boomerang.sol

unify ../contracts/Ownable.sol
unify ../contracts/BoomerangTokenInterface.sol
unify ../../boomerang-token-contracts/contracts/SafeMath.sol
unify ../../boomerang-token-contracts/contracts/ERC20Token.sol
unify ../contracts/BoomerangActor.sol
unify ../contracts/rewards/BoomerangRewardSystem.sol
unify ../contracts/rewards/BoomerangGrowthPoolRewardSystem.sol
unify ../contracts/rewards/BoomerangUserRewardSystem.sol
unify ../contracts/rewards/BoomerangWorkerRewardSystem.sol
unify ../contracts/rewards/BoomerangRewards.sol
unify ../contracts/BoomerangBusiness.sol
unify ../contracts/BoomerangRateExperience.sol
unify ../contracts/BoomerangUser.sol
unify ../contracts/BoomerangWorker.sol
unify ../contracts/Boomerang.sol
