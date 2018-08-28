export default async function assertUserRewardSystemStatus(boomerangRewardsContract, address, businessAddress, expectedRewardStep, expectedRewardCycle, expectedRewardLevel, expectedRewardRank) {

  let rewardStep = await boomerangRewardsContract.getUserRewardStep(address, businessAddress);
  let rewardCycle = await boomerangRewardsContract.getUserRewardCycle(address, businessAddress);
  let rewardLevel = await boomerangRewardsContract.getUserRewardLevel(address, businessAddress);
  let rewardRank = await boomerangRewardsContract.getUserRewardRank(address, businessAddress);

  Number(rewardStep).should.equal(expectedRewardStep);
  Number(rewardCycle).should.equal(expectedRewardCycle);
  Number(rewardLevel).should.equal(expectedRewardLevel);
  Number(rewardRank).should.equal(expectedRewardRank);
}