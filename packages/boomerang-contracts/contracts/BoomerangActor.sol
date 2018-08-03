pragma solidity ^0.4.24;

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

  // businessAddress => actorAddress => nonceValue
  mapping(address => mapping(address => uint256)) public nonceValue;

  // businessAddress => userId => nonceValue
  mapping(address => mapping(bytes32 => uint256)) public nonceValueForUsersWithoutAddress;


  modifier withCorrectSignature(address _businessAddress, address _address, uint8 _v, bytes32 _r, bytes32 _s) {

    bytes32 nonceHash = keccak256(nonceValue[_businessAddress][_address]);
    bytes memory prefix = '\x19Ethereum Signed Message:\n32';
    bytes32 prefixedHash = keccak256(prefix, nonceHash);
    address recoveredAddress = ecrecover(prefixedHash, _v, _r, _s);

    require(recoveredAddress == _address);

    nonceValue[_businessAddress][_address] += 1;
    _;
  }
}
