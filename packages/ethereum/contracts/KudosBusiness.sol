pragma solidity ^0.4.18;

import "./KudosActor.sol";

contract KudosBusiness is KudosActor {

  event RegisteredAsBusiness(address indexed _businessAddress);
  event BusinessHasApprovedWorker(address indexed _businessAddress, address indexed _workerAddress);

  function registerAsBusiness(address _businessAddress) public {

    isBusiness[_businessAddress] = true;
    RegisteredAsBusiness(_businessAddress);

    // any business registration init
  }

  function addWorker(address _workerAddress, address _businessAddress) public {

    businessHasApprovedWorker[_businessAddress][_workerAddress] = true;
    BusinessHasApprovedWorker(_businessAddress, _workerAddress);

    if (workerHasApprovedBusiness[_workerAddress][_businessAddress] && !isEmployed[_businessAddress][_workerAddress]) {
      isEmployed[_businessAddress][_workerAddress] = true;
      workerList[_businessAddress].push(_workerAddress);
      isWorker[_workerAddress] = true;
    }

    // any add employee init
  }

  function getEmployeeAddress(address _businessAddress, uint _index) public view returns (address) {
    return workerList[_businessAddress][_index];
  }

  function numberOfEmployees(address _businessAddress) public view returns (uint256) {
    return workerList[_businessAddress].length;
  }
}