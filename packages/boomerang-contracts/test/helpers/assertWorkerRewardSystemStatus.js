export default async function assertWorkerRewardSystemStatus(boomerangRewardsContract, address, businessAddress, expectedRewardStep, expectedRewardCycle, expectedRewardLevel, expectedRewardRank) {

  let rewardStep = await boomerangRewardsContract.getWorkerRewardStep(address, businessAddress);
  let rewardCycle = await boomerangRewardsContract.getWorkerRewardCycle(address, businessAddress);
  let rewardLevel = await boomerangRewardsContract.getWorkerRewardLevel(address, businessAddress);
  let rewardRank = await boomerangRewardsContract.getWorkerRewardRank(address, businessAddress);

  Number(rewardStep).should.equal(expectedRewardStep);
  Number(rewardCycle).should.equal(expectedRewardCycle);
  Number(rewardLevel).should.equal(expectedRewardLevel);
  Number(rewardRank).should.equal(expectedRewardRank);
}