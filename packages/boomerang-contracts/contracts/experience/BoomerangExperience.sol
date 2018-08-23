pragma solidity ^0.4.24;
//pragma experimental ABIEncoderV2;

contract BoomerangExperience {

  function getNonceValueForNewRating(address _businessAddress, address _userAddress) public view returns (uint256 _nonceValue);

  function rate(  address _userAddress,
                  address _workerAddress,
                  address _businessAddress,
                  uint256 _workerRating,
                  uint256 _businessRating,
                  bytes32 _ipfsHash,
                  uint8 _v,
                  bytes32 _r,
                  bytes32 _s) public;
}