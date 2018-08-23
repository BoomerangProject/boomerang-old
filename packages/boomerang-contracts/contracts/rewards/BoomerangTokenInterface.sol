pragma solidity ^0.4.24;
//pragma experimental ABIEncoderV2;

import "../../../boomerang-token-contracts/contracts/SafeMath.sol";
import '../../../boomerang-token-contracts/contracts/ERC20Token.sol';

contract BoomerangTokenInterface {
  using SafeMath for uint256;

  ERC20Token public boomerangToken;
}