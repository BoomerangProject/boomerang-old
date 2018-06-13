import WriteRequester from './WriteRequester';

export default class RegisterAsWorkerRequester extends WriteRequester {

  constructor(workerName, workerAddress) {

    const apiMethod = '/registerAsWorker';

    const apiMethodParameters = {
      workerName: workerName,
      workerAddress: workerAddress
    };

    super(apiMethod, apiMethodParameters);
  }
}