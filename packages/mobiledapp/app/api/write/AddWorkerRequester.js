import WriteRequester from './WriteRequester';

export default class AddWorkerRequester extends WriteRequester {

  constructor(workerAddress, businessAddress) {

    const apiMethod = '/addWorker';

    const apiMethodParameters = {
      workerAddress: workerAddress,
      businessAddress: businessAddress

    };

    super(apiMethod, apiMethodParameters);
  }
}