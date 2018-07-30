const BigNumber = web3.BigNumber;

export default async function fillGrowthPool(kudosToken, deployerAddress, kudosContractAddress) {

  const tokenUnit = new BigNumber(10 ** 18);

  await kudosToken.approve(kudosContractAddress, 10000*tokenUnit, {from: deployerAddress});
}