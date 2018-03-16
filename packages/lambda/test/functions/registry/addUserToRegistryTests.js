import ethUtil from "ethereumjs-util";

const should = require('chai')
  .use(require('chai-as-promised'))
  .should();

const axios = require("axios");
axios.defaults.baseURL = 'http://localhost:3000';
axios.defaults.timeout = 30000;

//
// client.defaults.timeout = 30000;
//
// const privateKey =  new Buffer("a62d1306d2f88e6a9e5adf5b8a632d5026019bfb450c009886dba13e9ed357aa", "hex");
// const address = "0xbac2a9e1995dc4eb23fd565ffe5fecc58eb4f71e";

describe("addUserToRegistryTests", function() {

  it("business should be able to add user to registry", async function() {

    const nonceValue = await getNonce("0xmyAddress");


    console.log("the nonce value is " + nonceValue);

    // axios.get('/getNonceForAddingUserToRegistry', {
    //   businessAddress: address,
    //   userId: "Fred",
    //   userAddress: "0x1234",
    //   data: signature
    // })
    //   .then(function(response) {
    //
    //
    //     console.log(response);
    //
    //     const myVariable = 2;
    //     myVariable.should.be(3);
    //
    //   })
    //   .catch(function(error) {
    //     console.log(error);
    //   });


    // const signature = ethUtil.ecsign(messageHash, privateKey);

    // axios.post('/user', {
    //   businessAddress: address,
    //   userId: "Fred",
    //   userAddress: "0x1234",
    //   data: signature
    // })
    //   .then(function(response) {
    //
    //
    //     console.log(response);
    //
    //     const myVariable = 2;
    //     myVariable.should.be(3);
    //
    //   })
    //   .catch(function(error) {
    //     console.log(error);
    //   });
  });
});


async function getNonce(businessAddressArg) {

  return new Promise(function(resolve, reject) {

    return axios.get('/getNonceForAddingUserToRegistry', {

      params: {
        businessAddress: businessAddressArg
      }

    }).then(function (response) {

      const nonceValue = response.data.nonce;
      return resolve(nonceValue);

    }).catch(function (error) {
      return reject(error);
    });
  });
}
