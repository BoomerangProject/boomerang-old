import BoomerangReadRequester from './BoomerangReadRequester';

export default class GetNonceValueRequester extends BoomerangReadRequester {

  constructor(businessAddress, workerAddress) {

    const apiMethod = 'getNonceValue';
    const apiMethodParameters = [businessAddress, workerAddress];

    super(apiMethod, apiMethodParameters);
  }
}