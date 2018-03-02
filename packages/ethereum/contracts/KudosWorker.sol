pragma solidity ^0.4.18;

import "./KudosActor.sol";

contract KudosWorker is KudosActor {

  event SetBusinessAsEmployer(address indexed _businessAddress, address indexed _workerAddress);

  event UserRating( address indexed _businessAddress,
                    address indexed _workerAddress,
                    address indexed _userAddress,
                    uint256 userRating,
                    bytes32 ipfsHash);

  function addEmployer(address _businessAddress) public {

    setBusinessAsEmployer(_businessAddress);
    addToEmployeeListIfBusinessApproves(_businessAddress);

    // any add business init
  }

  function setBusinessAsEmployer(address _businessAddress) internal {
    isEmployer[msg.sender][_businessAddress] = true;
  }

  function addToEmployeeListIfBusinessApproves(address _businessAddress) internal {
    if (isEmployee[_businessAddress][msg.sender]) {
      employeeList[_businessAddress].push(msg.sender);
    }
  }

  function isEmployed(address _businessAddress, address _workerAddress) public view returns (bool) {
    return isEmployer[_workerAddress][_businessAddress] && isEmployee[_businessAddress][_workerAddress];
  }

  function rateUser(address _businessAddress, address _userAddress, uint256 userRating, bytes32 transactionHash) public {

    numberOfUserRatings[_userAddress] += 1;
    userAverageRating[_userAddress] = (userAverageRating[_userAddress] + userRating) / numberOfUserRatings[_userAddress];
    UserRating(_businessAddress, msg.sender, _userAddress, userRating, transactionHash);
  }
}