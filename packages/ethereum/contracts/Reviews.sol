pragma solidity ^0.4.18;

contract Reviews {

  uint public rating;
  string public reviewText;

  event Review(address indexed _from, address indexed _to, uint256 _value);

  function storeReview(uint _rating, string _reviewText) public returns (address) {
    rating = _rating;
    reviewText = _reviewText;
    return msg.sender;
  }
}