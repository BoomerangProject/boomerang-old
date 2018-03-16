// import ethUtil from "ethereumjs-util";
//
// const should = require('chai')
//   .use(require('chai-as-promised'))
//   .should();
//
// const axios = require("axios");
// axios.defaults.baseURL = 'http://localhost:3000';
// axios.defaults.timeout = 30000;
//
// const goodPrivateKey =  new Buffer("a62d1306d2f88e6a9e5adf5b8a632d5026019bfb450c009886dba13e9ed357aa", "hex");
// const badPrivateKey =  new Buffer("C0FFEEC0FFEEC0FFEEC0FFEEC0FFEEC0FFEEC0FFEEC0FFEEC0FFEEC0FFEEEEEE", "hex");
// const address = "0xbac2a9e1995dc4eb23fd565ffe5fecc58eb4f71e";
//
// describe("addUserToRegistryTests", function() {
//
//   it("business with good signature should be able to add user to registry", async function() {
//
//     const nonceValue = await getNonceForAddingUserToRegistry(address);
//     console.log("nonce for " + address + " is " + nonceValue);
//
//     const message = ethUtil.toBuffer(nonceValue);
//     const messageHash = ethUtil.hashPersonalMessage(message);
//
//
//     const signature = ethUtil.ecsign(messageHash, goodPrivateKey);
//
//     const userId = "Fred";
//     const userAddress = "0xFlintstone";
//
//     const statusCode = await addUserToRegistry(address, signature, userId, userAddress);
//
//     console.log("status code is " + statusCode);
//     statusCode.should.equal(200);
//   });
//
//   it("business with bad signature should not be able to add user to registry", async function() {
//
//     const nonceValue = await getNonceForAddingUserToRegistry(address);
//     console.log("nonce for " + address + " is " + nonceValue);
//
//     const message = ethUtil.toBuffer(nonceValue);
//     const messageHash = ethUtil.hashPersonalMessage(message);
//
//
//     const signature = ethUtil.ecsign(messageHash, badPrivateKey);
//
//     const userId = "Fred";
//     const userAddress = "0xFlintstone";
//
//     const statusCode = await addUserToRegistry(address, signature, userId, userAddress);
//
//     console.log("status code is " + statusCode);
//     statusCode.should.equal(401);
//   });
// });
//
//
//
//
//
// async function getNonceForAddingUserToRegistry(businessAddressArg) {
//
//   return new Promise(function(resolve, reject) {
//
//     return axios.get('/getNonceForAddingUserToRegistry', {
//
//       params: {
//         businessAddress: businessAddressArg
//       }
//
//     }).then(function (response) {
//
//       const nonceValue = response.data.nonce;
//       return resolve(nonceValue);
//
//     }).catch(function (error) {
//       return reject(error);
//     });
//   });
// }
//
//
// async function addUserToRegistry(businessAddressArg, signatureArg, userIdArg, userAddressArg) {
//
//   return new Promise(function(resolve, reject) {
//
//     return axios.post('/addUserToRegistry', {
//
//       businessAddress: businessAddressArg,
//       signature: signatureArg,
//       userId: userIdArg,
//       userAddress: userAddressArg,
//
//     }).then(function (response) {
//
//       return resolve(response.status);
//
//     }).catch(function (error) {
//       return resolve(error.response.status);
//     });
//   });
// }
