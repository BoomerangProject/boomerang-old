import { ipfsHash, rewardSystem } from './mockData';

export default async function completeOneUserRewardCycle(boomerang, userAddress, workerAddress, businessAddress) {

  for (let i = 0; i < rewardSystem.numberOfRewardSteps; i++) {
    const workerRating = 3;
    const businessRating = 3;
    await boomerang.rateExperience(userAddress, workerAddress, businessAddress, workerRating, businessRating, ipfsHash);
  }
}