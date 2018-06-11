import KudosReadRequester from "./KudosReadRequester";

export default class BusinessHasApprovedWorkerRequester extends KudosReadRequester {

  constructor(businessAddress, workerAddress) {

    const apiMethod = 'businessHasApprovedWorker';
    const apiMethodParameters = [businessAddress, workerAddress];

    super(apiMethod, apiMethodParameters);
  }
}