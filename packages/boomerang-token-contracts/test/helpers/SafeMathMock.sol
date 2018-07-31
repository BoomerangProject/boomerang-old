pragma solidity ^0.4.15;

import '../../contracts/SafeMath.sol';

contract SafeMathMock {
    uint public result;

    function multiply(uint a, uint b) {
        result = SafeMath.mul(a, b);
    }

    function subtract(uint a, uint b) {
        result = SafeMath.sub(a, b);
    }

    function add(uint a, uint b) {
        result = SafeMath.add(a, b);
    }

    function divide(uint a, uint b) {
        result = SafeMath.div(a, b);
    }

    function min256(uint256 a, uint256 b) {
        result = SafeMath.min256(a, b);
    }
}
