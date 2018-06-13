import WriteRequester from './WriteRequester';

export default class RegisterAsWorkerRequester extends WriteRequester {

  constructor(workerAddress, businessAddress, workerName) {

    const apiMethod = '/registerAsWorker';

    const apiMethodParameters = {
      workerAddress: workerAddress,
      businessAddress: businessAddress,
      workerName: workerName
    };

    super(apiMethod, apiMethodParameters);
  }
}