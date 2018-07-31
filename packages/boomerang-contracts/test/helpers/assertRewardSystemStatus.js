export default async function assertRewardSystemStatus(boomerang, address, businessAddress, expectedRewardStep, expectedRewardCycle, expectedRewardLevel, expectedRewardRank) {

  let rewardStep = await boomerang.getUserRewardStep(address, businessAddress);
  let rewardCycle = await boomerang.getUserRewardCycle(address, businessAddress);
  let rewardLevel = await boomerang.getUserRewardLevel(address, businessAddress);
  let rewardRank = await boomerang.getUserRewardRank(address, businessAddress);

  Number(rewardStep).should.equal(expectedRewardStep);
  Number(rewardCycle).should.equal(expectedRewardCycle);
  Number(rewardLevel).should.equal(expectedRewardLevel);
  Number(rewardRank).should.equal(expectedRewardRank);
}