pragma solidity ^0.4.24;

import './BoomerangAuth.sol';

contract BoomerangAuthImpl is BoomerangAuth {

  // actorAddress => nonceValue
  mapping(address => uint256) public nonceValueForGasSubsidy;

  function getNonceValueForGasSubsidy(address _actorAddress) public view returns (uint256 _nonceValue) {
    _nonceValue = nonceValueForGasSubsidy[_actorAddress];
  }

  function verify(address _actorAddress, uint8 _v, bytes32 _r, bytes32 _s) public {

    bytes32 nonceHash = keccak256(abi.encodePacked(_actorAddress, nonceValueForGasSubsidy[_actorAddress]));
    bytes memory prefix = '\x19Ethereum Signed Message:\n32';
    bytes32 prefixedHash = keccak256(abi.encodePacked(prefix, nonceHash));
    address recoveredAddress = ecrecover(prefixedHash, _v, _r, _s);
    require(recoveredAddress == _actorAddress);

    nonceValueForGasSubsidy[_actorAddress] += 1;
  }
}