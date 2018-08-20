pragma solidity ^0.4.24;
//pragma experimental ABIEncoderV2;

contract BoomerangActor {

  // business
  mapping(address => bool) public isBusiness;

  mapping(address => mapping(address => bool)) public businessHasApprovedWorker;
  mapping(address => address[]) public workerList;

  // worker
  mapping(address => bool) public isWorker;

  mapping(address => mapping(address => bool)) public workerHasApprovedBusiness;
  mapping(address => address[]) public businessList;

  // user
  mapping(address => bool) public isUser;

  // business + worker
  mapping(address => mapping(address => bool)) public isEmployed;

  // ratings
  mapping(address => uint256) public businessRatingsSum;
  mapping(address => uint256) public numberOfBusinessRatings;

  mapping(address => mapping(address => uint256)) public workerRatingsSum;
  mapping(address => mapping(address => uint256)) public numberOfWorkerRatings;

  mapping(address => uint256) public userRatingsSum;
  mapping(address => uint256) public numberOfUserRatings;

  // actorAddress => nonceValue
  mapping(address => uint256) public nonceValueForGasSubsidy;

//  struct Signature {
//
//    uint8 v;
//    bytes32 r;
//    bytes32 s;
//  }

  function getNonceValueForGasSubsidy(address _actorAddress) public view returns (uint256 _nonceValue) {
    _nonceValue = nonceValueForGasSubsidy[_actorAddress];
  }

  function verifyActor(address _actorAddress, uint8 _v, bytes32 _r, bytes32 _s) internal {

    bytes32 nonceHash = keccak256(abi.encodePacked(_actorAddress, nonceValueForGasSubsidy[_actorAddress]));
    bytes memory prefix = '\x19Ethereum Signed Message:\n32';
    bytes32 prefixedHash = keccak256(abi.encodePacked(prefix, nonceHash));
    address recoveredAddress = ecrecover(prefixedHash, _v, _r, _s);
    require(recoveredAddress == _actorAddress);

    nonceValueForGasSubsidy[_actorAddress] += 1;
  }
}
