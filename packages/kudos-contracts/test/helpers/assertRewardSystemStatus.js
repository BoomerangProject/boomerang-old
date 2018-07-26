export default async function assertRewardSystemStatus(kudos, address, businessAddress, expectedRewardStep, expectedRewardCycle, expectedRewardLevel, expectedRewardRank) {

  let rewardStep = await kudos.getUserRewardStep(address, businessAddress);
  let rewardCycle = await kudos.getUserRewardCycle(address, businessAddress);
  let rewardLevel = await kudos.getUserRewardLevel(address, businessAddress);
  let rewardRank = await kudos.getUserRewardRank(address, businessAddress);

  Number(rewardStep).should.equal(expectedRewardStep);
  Number(rewardCycle).should.equal(expectedRewardCycle);
  Number(rewardLevel).should.equal(expectedRewardLevel);
  Number(rewardRank).should.equal(expectedRewardRank);
}