pragma solidity ^0.4.24;

import "./StandardToken.sol";
import "./Ownable.sol";
import "./TokenHolder.sol";

/**
 * @title Boomerang Token
 * @author Ben Johnson
 *
 * @dev ERC20 Boomerang Token (BOOMERANG)
 *
 * Boomerang tokens are displayed using 18 decimal places of precision.
 *
 * The base units of Boomerang tokens are referred to as "kutoas".
 *
 * In Swahili, kutoa means "to give".
 * In Finnish, kutoa means "to weave" or "to knit".
 *
 * 1 BOOMERANG is equivalent to:
 *
 *    1,000,000,000,000,000,000 == 1 * 10**18 == 1e18 == One Quintillion kutoas
 *
 *
 * All initial BOOMERANG kutoas are assigned to the creator of this contract.
 *
 */
contract BoomerangToken is StandardToken, Ownable, TokenHolder {

   string public constant name = "Boomerang";
   string public constant symbol = "BOOMERANG";
   uint8 public constant decimals = 18;
   string public constant version = "1.0";

   uint256 public constant tokenUnit = 10 ** 18;
   uint256 public constant oneBillion = 10 ** 9;
   uint256 public constant maxTokens = 10 * oneBillion * tokenUnit;

   constructor() public  {
      totalSupply_ = maxTokens;
      balances[msg.sender] = maxTokens;
   }
}
