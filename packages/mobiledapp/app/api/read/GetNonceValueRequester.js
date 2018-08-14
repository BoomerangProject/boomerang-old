import BoomerangReadRequester from './BoomerangReadRequester';

export default class GetNonceValueRequester extends BoomerangReadRequester {

  constructor(businessAddress, actorAddress) {

    const apiMethod = 'getNonceValue';
    const apiMethodParameters = [businessAddress, actorAddress];

    super(apiMethod, apiMethodParameters);
  }
}