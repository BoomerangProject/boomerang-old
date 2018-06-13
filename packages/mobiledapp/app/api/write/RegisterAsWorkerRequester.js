import WriteRequester from './WriteRequester';

export default class RegisterAsWorkerRequester extends WriteRequester {

  constructor(workerAddress, workerName) {

    const apiMethod = '/registerAsWorker';

    const apiMethodParameters = {
      workerAddress: workerAddress,
      workerName: workerName
    };

    super(apiMethod, apiMethodParameters);
  }
}