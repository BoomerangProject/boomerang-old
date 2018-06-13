import WriteRequester from './WriteRequester';

export default class RegisterAsUserRequester extends WriteRequester {

  constructor(userAddress, userName) {

    const apiMethod = '/registerAsUser';

    const apiMethodParameters = {
      userAddress: userAddress,
      userName: userName
    };

    super(apiMethod, apiMethodParameters);
  }
}