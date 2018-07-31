const BigNumber = web3.BigNumber;

export default async function fillRewardPool(boomerangToken, deployerAddress, businessAddress, boomerangContractAddress) {

  const tokenUnit = new BigNumber(10 ** 18);

  await boomerangToken.transfer(businessAddress, 10000*tokenUnit, {from: deployerAddress});
  await boomerangToken.approve(boomerangContractAddress, 10000*tokenUnit, {from: businessAddress});
}