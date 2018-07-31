import BoomerangReadRequester from './BoomerangReadRequester';

export default class BusinessHasApprovedWorkerRequester extends BoomerangReadRequester {

  constructor(businessAddress, workerAddress) {

    const apiMethod = 'businessHasApprovedWorker';
    const apiMethodParameters = [businessAddress, workerAddress];

    super(apiMethod, apiMethodParameters);
  }
}