#!/bin/sh

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

function unify() {
	grep -v "^[pragma|import]" $DIR/$1 >> ~/Desktop/Kudos.sol
}

echo "pragma solidity ^0.4.18;" > ~/Desktop/Kudos.sol

unify ../contracts/KudosActor.sol
unify ../contracts/KudosUser.sol
unify ../contracts/KudosWorker.sol
unify ../contracts/KudosBusiness.sol
unify ../contracts/Kudos.sol
