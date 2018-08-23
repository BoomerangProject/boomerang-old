pragma solidity ^0.4.24;
//pragma experimental ABIEncoderV2;

contract BoomerangUser {

  function registerAsUser(address _userAddress, bytes32 _ipfsHash) public;

  function updateUserProfile( address _userAddress,
                              bytes32 _ipfsHash,
                              uint8 _v,
                              bytes32 _r,
                              bytes32 _s) public;
}

