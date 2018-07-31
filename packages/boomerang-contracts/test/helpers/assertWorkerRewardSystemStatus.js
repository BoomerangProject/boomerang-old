export default async function assertWorkerRewardSystemStatus(boomerang, address, businessAddress, expectedRewardStep, expectedRewardCycle, expectedRewardLevel, expectedRewardRank) {

  let rewardStep = await boomerang.getWorkerRewardStep(address, businessAddress);
  let rewardCycle = await boomerang.getWorkerRewardCycle(address, businessAddress);
  let rewardLevel = await boomerang.getWorkerRewardLevel(address, businessAddress);
  let rewardRank = await boomerang.getWorkerRewardRank(address, businessAddress);

  Number(rewardStep).should.equal(expectedRewardStep);
  Number(rewardCycle).should.equal(expectedRewardCycle);
  Number(rewardLevel).should.equal(expectedRewardLevel);
  Number(rewardRank).should.equal(expectedRewardRank);
}