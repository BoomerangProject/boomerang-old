pragma solidity ^0.4.24;

import "./KudosBusiness.sol";
import "./KudosWorker.sol";
import "./KudosUser.sol";
import "../../kudos-token-contracts/contracts/KudosToken.sol";

contract Kudos is KudosUser, KudosWorker, KudosBusiness, Ownable {

  KudosToken public kudosToken;

  constructor(address _tokenContractAddress) public {
    kudosToken = KudosToken(_tokenContractAddress);
  }
}