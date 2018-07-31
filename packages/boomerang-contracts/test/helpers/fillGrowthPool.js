const BigNumber = web3.BigNumber;

export default async function fillGrowthPool(boomerangToken, deployerAddress, boomerangContractAddress) {

  const tokenUnit = new BigNumber(10 ** 18);

  await boomerangToken.approve(boomerangContractAddress, 10000*tokenUnit, {from: deployerAddress});
}