pragma solidity ^0.4.18;

contract Rewards {


  mapping(address => mapping(address => uint256)) public employeeRewardProgress;
  uint256 public employeeRewardGoal;

}