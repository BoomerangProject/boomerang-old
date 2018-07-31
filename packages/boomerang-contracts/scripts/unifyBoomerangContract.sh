#!/bin/sh

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

function unify() {
	grep -v "^[pragma|import]" $DIR/$1 >> ~/Desktop/Boomerang.sol
}

echo "pragma solidity ^0.4.18;" > ~/Desktop/Boomerang.sol

unify ../contracts/BoomerangActor.sol
unify ../contracts/BoomerangUser.sol
unify ../contracts/BoomerangWorker.sol
unify ../contracts/BoomerangBusiness.sol
unify ../contracts/Boomerang.sol
