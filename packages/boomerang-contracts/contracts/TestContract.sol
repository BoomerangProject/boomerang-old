pragma solidity ^0.4.24;

contract TestContract {


  mapping(address => uint256[5]) public ratingRewards;

  function setRatingRewards(address _businessAddress,
                            uint256[5] _ratingRewards,
                            uint8 _v,
                            bytes32 _r,
                            bytes32 _s) external {

    onlyTest(_businessAddress, _v, _r, _s);
    ratingRewards[_businessAddress] = _ratingRewards;
  }

    mapping(address => uint256) public onlyTestMapping;

    function onlyTest(address _actorAddress, uint8 _v, bytes32 _r, bytes32 _s) internal {

      bytes32 nonceHash = keccak256(abi.encodePacked(_actorAddress, onlyTestMapping[_actorAddress]));
      bytes memory prefix = '\x19Ethereum Signed Message:\n32';
      bytes32 prefixedHash = keccak256(abi.encodePacked(prefix, nonceHash));
      address recoveredAddress = ecrecover(prefixedHash, _v, _r, _s);
      require(recoveredAddress == _actorAddress);

      onlyTestMapping[_actorAddress] += 1;
    }
}