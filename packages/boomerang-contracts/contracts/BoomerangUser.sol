pragma solidity ^0.4.24;
//pragma experimental ABIEncoderV2;

import './BoomerangActor.sol';

contract BoomerangUser is BoomerangActor {

  event UserProfileUpdated(address indexed _userAddress, bytes32 _ipfsHash);


  function registerAsUser(address _userAddress, bytes32 _ipfsHash) public {

    require(isUser[_userAddress] == false);
    isUser[_userAddress] = true;
    emit UserProfileUpdated(_userAddress, _ipfsHash);
  }

  function updateUserProfile(address _userAddress, bytes32 _ipfsHash) public {
    emit UserProfileUpdated(_userAddress, _ipfsHash);
  }
}

