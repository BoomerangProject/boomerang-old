// import contract from "truffle-contract";
// import provider from "./Web3Provider";
// import { fromAscii } from "web3-utils";
//
// const KudosContractJson = require("kudos-contract-objects/Kudos");
// const KudosContract = contract(KudosContractJson);
// KudosContract.setProvider(provider);
//
// const hotWalletAddress = "0xdcee2f1da7262362a962d456280a928f4f90bb5e";
//
// class KudosContractService {
//
//   async getInstance() {
//
//     const instance = await KudosContract.at("0xe6c55c2088bf3f71546615b43174455560e4fa16");
//     return instance;
//   }
//
//   async isBusiness() {
//     const instance = await this.getInstance();
//     const isBusiness = await instance.isBusiness(hotWalletAddress);
//     return isBusiness;
//   }
//
//   async registerAsBusiness() {
//     const instance = await this.getInstance();
//     instance.registerAsBusiness({from: hotWalletAddress});
//   }
//
//   async getNonceValue(businessAddress, userId) {
//     const instance = await this.getInstance();
//     const nonceValue = await instance.nonce(businessAddress, fromAscii(userId));
//     return nonceValue;
//   }
//
//   async incrementNonceValue(businessAddress, userId) {
//     const instance = await this.getInstance();
//     instance.incrementNonce(businessAddress, fromAscii(userId), {from: hotWalletAddress});
//   }
// }
//
// export default new KudosContractService();
