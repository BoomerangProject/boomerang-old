pragma solidity ^0.4.18;

import "./KudosActor.sol";

contract KudosBusiness is KudosActor {

  event RegisteredAsBusiness(address indexed _businessAddress);
  event SetWorkerAsEmployee(address indexed _businessAddress, address indexed _workerAddress);
  event AddedToEmployeeList(address indexed _businessAddress, address indexed _workerAddress);

  modifier onlyBusiness() {
    require(isBusiness[msg.sender]);
    _;
  }

  function registerAsBusiness() public {
    isBusiness[msg.sender] = true;
    RegisteredAsBusiness(msg.sender);

    // any business registration init
  }

  function addEmployee(address _workerAddress) onlyBusiness public {

    setWorkerAsEmployee(_workerAddress);
    addToEmployeeListIfWorkerApproves(_workerAddress);

    // any add employee init
  }

  function setWorkerAsEmployee(address _workerAddress) internal {
    isEmployee[msg.sender][_workerAddress] = true;
    SetWorkerAsEmployee(msg.sender, _workerAddress);
  }

  function addToEmployeeListIfWorkerApproves(address _workerAddress) internal {
    if (isEmployer[_workerAddress][msg.sender]) {
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