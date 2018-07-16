import WriteRequester from './WriteRequester';

export default class RegisterWorkerRewardSystem extends WriteRequester {

  constructor(businessAddress, numberOfRewardSteps, numberOfRewardCycles, numberOfRewardLevels, levelRewards, ratingRewards, ipfsObject) {

    const apiMethod = '/registerWorkerRewardSystem';

    const apiMethodParameters = {
      businessAddress: businessAddress,
      numberOfRewardSteps: numberOfRewardSteps,
      numberOfRewardCycles: numberOfRewardCycles,
      numberOfRewardLevels: numberOfRewardLevels,
      levelRewards: levelRewards,
      ratingRewards: ratingRewards,
      ipfsObject: ipfsObject
    };

    super(apiMethod, apiMethodParameters);
  }
}
