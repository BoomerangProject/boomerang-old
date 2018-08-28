const BigNumber = web3.BigNumber;

export default async function fillRewardPool(boomerangToken, deployerAddress, businessAddress, boomerangRewardsContractAddress) {

  const tokenUnit = new BigNumber(10 ** 18);

  await boomerangToken.transfer(businessAddress, 10000*tokenUnit, {from: deployerAddress});
  await boomerangToken.approve(boomerangRewardsContractAddress, 10000*tokenUnit, {from: businessAddress});
}
