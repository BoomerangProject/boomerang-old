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

export async function getBoomerangExperienceContract(boomerangWorkerAddress, boomerangBusinessAddress) {

  const BoomerangTokenContract = artifacts.require("BoomerangToken");
  const boomerangToken = await BoomerangTokenContract.new();
  
  const BoomerangExperienceContract = artifacts.require("BoomerangExperienceContract");
  const boomerangExperienceContract = await BoomerangExperienceContract.new(boomerangToken.address, boomerangWorkerAddress, boomerangBusinessAddress);
  return boomerangExperienceContract;
}