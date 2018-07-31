pragma solidity ^0.4.24;

import "./Ownable.sol";
import "./SafeMath.sol";
import "./BoomerangToken.sol";

/**
 * @title BoomerangTokenSale
 * @author Ben Johnson
 *
 * @dev BoomerangTokenSale is a token crowdsale contract
 * @dev Based on KinTokenSale contract: https://github.com/kikinteractive/kin-token
 * @dev Based on WildCryptoICO's Crowdsale contract: https://github.com/WildCryptoICO/Wild-Crypto-Token
 */
contract BoomerangTokenSale is Ownable, TokenHolder {
   using SafeMath for uint256;

   BoomerangToken public boomerangToken;

   uint256 public startTime;
   uint256 public constant numberOfDays = 30;
   uint256 public constant ethPriceInDollars = 300;
   address public wallet;

   uint256 public constant tokenUnit = 10 ** 18;
   uint256 public constant oneMillion = 10 ** 6;
   uint256 public constant oneBillion = 10 ** 9;
   uint256 public constant amountOfTokensForSale = 4 * oneBillion * tokenUnit;

   uint256 public constant goalInDollars = 30 * oneMillion;
   uint256 public constant kutoasPerDollar = amountOfTokensForSale/goalInDollars;

   uint256 public constant weiPerDollar = tokenUnit / ethPriceInDollars;
   uint256 public constant kutoasPerWei = kutoasPerDollar / weiPerDollar;

   uint256 public constant cap = 100000 * weiPerDollar;
   uint256 public constant maxValue = uint256(-1);

   mapping (address => uint256) public participationHistory;
   mapping (address => uint256) public participationCaps;

   constructor(address _wallet, uint256 _startTime, address _tokenContractAddress) public {

      require(_wallet != address(0));
      require(_startTime >= now);
      require(_tokenContractAddress != address(0));

      wallet = _wallet;
      startTime = _startTime;
      boomerangToken = BoomerangToken(_tokenContractAddress);
   }

   function tokensAvailable() public view returns (uint256) {
      return boomerangToken.balanceOf(this);
   }

   modifier whenTokenSaleIsActive() {
      require(isActive());
      _;
   }

   function isActive() public view returns (bool) {
      return (
         isAfterStartTime() &&
         isBeforeEndTime() &&
         tokensAreAvailable()
      );
   }

   function isAfterStartTime() public view returns (bool) {
      return now >= startTime;
   }

   function isBeforeEndTime() public view returns (bool) {
      return now <= startTime.add(numberOfDays * 1 days);
   }

   function tokensAreAvailable() public view returns (bool) {
      return tokensAvailable() > 0;
   }

   function () public payable {
      buyTokens();
   }

   event IssueTokens(address indexed to, uint256 weiValue, uint256 amountOfTokens);

   function buyTokens() public payable whenTokenSaleIsActive {

      require(msg.value > 0);

      uint256 weiValue = getWeiValue();

      transferWeiToWallet(weiValue);
      issueTokensToBuyer(weiValue);
      issueRefundIfNecessary(weiValue);
   }

   function getWeiValue() internal returns (uint256) {

      // Enforce participation cap (in Wei received).
      uint256 weiAlreadyParticipated = participationHistory[msg.sender];
      uint256 participationCap = participationCaps[msg.sender];
      uint256 cappedWeiReceived = SafeMath.min256(msg.value, participationCap.sub(weiAlreadyParticipated));
      require(cappedWeiReceived > 0);

      // Accept funds and transfer to funding recipient.
      uint256 weiLeftInSale = tokensAvailable().div(kutoasPerWei);
      uint256 weiValue = SafeMath.min256(cappedWeiReceived, weiLeftInSale);
      participationHistory[msg.sender] = weiAlreadyParticipated.add(weiValue);

      return weiValue;
   }

   function transferWeiToWallet(uint256 weiValue) internal  {
      wallet.transfer(weiValue);
   }

   function issueTokensToBuyer(uint256 weiValue) internal  {
      uint256 amountOfTokens = getNumberOfTokensToIssue(weiValue);
      assert(boomerangToken.transfer(msg.sender, amountOfTokens));
      emit IssueTokens(msg.sender, weiValue, amountOfTokens);
   }

   function getNumberOfTokensToIssue(uint256 weiValue) internal constant returns (uint256) {

      uint256 numberOfTokensToIssue = weiValue.mul(kutoasPerWei);

      // if purchase would cause less kutoasPerWei tokens left available that nobody could ever buy them,
      // then gift them to the last buyer.
      if (tokensAvailable().sub(numberOfTokensToIssue) < kutoasPerWei) {
         numberOfTokensToIssue = tokensAvailable();
      }

      return numberOfTokensToIssue;
   }

   function issueRefundIfNecessary(uint256 weiValue) internal  {

      // partial refund if full participation not possible due to cap being reached
      uint256 refund = msg.value.sub(weiValue);

      if (refund > 0) {
          msg.sender.transfer(refund);
      }
   }

   function registerTier1Users(address[] _users) external onlyOwner {
      setParticipationCap(_users, cap);
   }

   function registerTier2Users(address[] _users) external onlyOwner {
      setParticipationCap(_users, maxValue);
   }

   function unregisterUsers(address[] _users) external onlyOwner {
      setParticipationCap(_users, 0);
   }

   function setParticipationCap(address[] _users, uint256 _cap) private onlyOwner {
      for (uint i = 0; i < _users.length; i++) {
         participationCaps[_users[i]] = _cap;
      }
   }

   function endTokenSale() public onlyOwner {

      // transfer unsold tokens back to owner
      uint256 balance = boomerangToken.balanceOf(this);
      require(balance > 0);
      assert(boomerangToken.transfer(owner, balance));
   }
}
