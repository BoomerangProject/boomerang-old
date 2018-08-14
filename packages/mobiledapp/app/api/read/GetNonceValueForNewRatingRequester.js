import BoomerangReadRequester from './BoomerangReadRequester';

export default class GetNonceValueForNewRatingRequester extends BoomerangReadRequester {

  constructor(businessAddress, workerAddress) {

    const apiMethod = 'getNonceValueForNewRating';
    const apiMethodParameters = [businessAddress, workerAddress];

    super(apiMethod, apiMethodParameters);
  }
}