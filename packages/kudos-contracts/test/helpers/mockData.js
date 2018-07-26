export const ipfsHash = '0x7aec552a65bfd833319cecd80cb10be136a35c9da94a8c899f2536c371293b93';

class RewardSystem {

  constructor() {

    this.numberOfRewardSteps = 3;
    this.numberOfRewardCyclesForLevel = [4,4,4,4,4];
    this.numberOfRewardLevels = 5;
    this.levelRewards = [30, 40, 50, 60, 70];
  }
}

export const rewardSystem = new RewardSystem();