pragma solidity ^0.4.18;

import "./KudosActor.sol";

contract KudosBusiness is KudosActor {

  event RegisteredAsBusiness(address indexed _businessAddress);
  event BusinessHasApprovedWorker(address indexed _businessAddress, address indexed _workerAddress);
  event AddedToEmployeeList(address indexed _businessAddress, address indexed _workerAddress);

  function registerAsBusiness(address _businessAddress) public {
    isBusiness[_businessAddress] = true;
    RegisteredAsBusiness(msg.sender);

    // any business registration init
  }

  function addEmployee(address _workerAddress) public {


    businessHasApprovedWorker[msg.sender][_workerAddress] = true;
    BusinessHasApprovedWorker(msg.sender, _workerAddress);

    addToEmployeeListIfWorkerApproves(_workerAddress);

    // any add employee init
  }

  function addToEmployeeListIfWorkerApproves(address _workerAddress) internal {
    if (workerHasApprovedBusiness[_workerAddress][msg.sender]) {
      employeeList[msg.sender].push(_workerAddress);
    }
  }

  function getEmployeeAddress(address _businessAddress, uint _index) public view returns (address) {
    return employeeList[_businessAddress][_index];
  }

  function numberOfEmployees(address _businessAddress) public view returns (uint256) {

    return employeeList[_businessAddress].length;
  }
}