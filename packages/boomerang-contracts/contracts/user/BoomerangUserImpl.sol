pragma solidity ^0.4.24;
//pragma experimental ABIEncoderV2;

import './BoomerangUser.sol';
import '../authorization/BoomerangAuth.sol';

contract BoomerangUserImpl is BoomerangUser {

  // interfaces
  BoomerangAuth public boomerangAuth;

  // events
  event UserProfileUpdated(address indexed _userAddress, bytes32 _ipfsHash);

  // state
  mapping(address => bool) public isUser;

  mapping(address => uint256) public userRatingsSum;
  mapping(address => uint256) public numberOfUserRatings;

  // methods
  function registerAsUser(address _userAddress, bytes32 _ipfsHash) public {

    require(isUser[_userAddress] == false);
    isUser[_userAddress] = true;
    emit UserProfileUpdated(_userAddress, _ipfsHash);
  }

  function updateUserProfile( address _userAddress,
                              bytes32 _ipfsHash,
                              uint8 _v,
                              bytes32 _r,
                              bytes32 _s) public {

    boomerangAuth.verify(_userAddress, _v, _r, _s);
    emit UserProfileUpdated(_userAddress, _ipfsHash);
  }
}

