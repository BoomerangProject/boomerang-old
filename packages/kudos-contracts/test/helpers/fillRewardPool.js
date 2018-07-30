const BigNumber = web3.BigNumber;

export default async function fillRewardPool(kudosToken, deployerAddress, businessAddress, kudosContractAddress) {

  const tokenUnit = new BigNumber(10 ** 18);

  await kudosToken.transfer(businessAddress, 10000*tokenUnit, {from: deployerAddress});
  await kudosToken.approve(kudosContractAddress, 10000*tokenUnit, {from: businessAddress});
}