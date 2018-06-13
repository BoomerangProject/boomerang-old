import WriteRequester from './WriteRequester';

export default class RegisterAsUserRequester extends WriteRequester {

  constructor(userName, userAddress) {

    const apiMethod = '/registerAsUser';

    const apiMethodParameters = {
      workerName: workerName,
      workerAddress: workerAddress
    };

    super(apiMethod, apiMethodParameters);
  }
}