pragma solidity ^0.4.24;

contract BoomerangAuth {

  function getNonceValueForGasSubsidy(address _actorAddress) public view returns (uint256 _nonceValue);
  function verify(address _actorAddress, uint8 _v, bytes32 _r, bytes32 _s) public;
}