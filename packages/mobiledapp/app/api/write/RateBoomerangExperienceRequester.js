import WriteRequester from './WriteRequester';

export default class RateBoomerangExperienceRequester extends WriteRequester {

  constructor(userAddress, workerAddress, businessAddress, workerRating, businessRating, ipfsHash, v, r, s) {

    const apiMethod = '/rateBoomerangExperience';

    const apiMethodParameters = {
      userAddress: userAddress,
      workerAddress: workerAddress,
      businessAddress: businessAddress,
      workerRating: workerRating,
      businessRating: businessRating,
      ipfsHash: ipfsHash,
      v: v,
      r: r,
      s: s
    };

    super(apiMethod, apiMethodParameters);
  }
}