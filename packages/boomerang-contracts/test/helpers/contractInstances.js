export async function getBoomerangAuthContract() {

  const BoomerangAuthContract = artifacts.require("BoomerangAuthContract");
  const boomerangAuthContract = await BoomerangAuthContract.new();
  return boomerangAuthContract;
}

export async function getBoomerangUserContract(boomerangAuthAddress) {

  const BoomerangUserContract = artifacts.require("BoomerangUserContract");
  const boomerangUserContract = await BoomerangUserContract.new(boomerangAuthAddress);
  return boomerangUserContract;
}

export async function getBoomerangWorkerContract(boomerangAuthAddress) {
  
  const BoomerangWorkerContract = artifacts.require("BoomerangWorkerContract");
  const boomerangWorkerContract = await BoomerangWorkerContract.new(boomerangAuthAddress);
  return boomerangWorkerContract;
}

export async function getBoomerangBusinessContract(boomerangAuthAddress) {
  
  const BoomerangBusinessContract = artifacts.require("BoomerangBusinessContract");
  const boomerangBusinessContract = await BoomerangBusinessContract.new(boomerangAuthAddress);
  return boomerangBusinessContract;
}

export async function getBoomerangTokenContract() {

  const BoomerangTokenContract = artifacts.require("BoomerangToken");
  const boomerangToken = await BoomerangTokenContract.new();
  return boomerangToken;
}

export async function getBoomerangRewardsContract(boomerangAuthAddress, boomerangTokenContractAddress) {

  const BoomerangRewardsContract = artifacts.require("BoomerangRewardsContract");
  const boomerangRewardsContract = await BoomerangRewardsContract.new(boomerangAuthAddress, boomerangTokenContractAddress);
  return boomerangRewardsContract;
}

export async function getBoomerangExperienceContract(boomerangWorkerAddress, boomerangBusinessAddress, boomerangRewardsAddress) {

  const BoomerangExperienceContract = artifacts.require("BoomerangExperienceContract");
  const boomerangExperienceContract = await BoomerangExperienceContract.new(boomerangWorkerAddress, boomerangBusinessAddress, boomerangRewardsAddress);
  return boomerangExperienceContract;
}