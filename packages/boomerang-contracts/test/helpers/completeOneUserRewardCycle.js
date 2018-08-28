import { ipfsHash, rewardSystem } from './mockData';

export default async function completeOneUserRewardCycle(boomerangExperienceContract, signer, userAddress, workerAddress, businessAddress) {

  for (let i = 0; i < rewardSystem.numberOfRewardSteps; i++) {

    const workerRating = 3;
    const businessRating = 3;

    let sig = await signer.getSignature();
    await boomerangExperienceContract.rate(userAddress, workerAddress, businessAddress, workerRating, businessRating, ipfsHash, sig.v, sig.r, sig.s);
  }
}