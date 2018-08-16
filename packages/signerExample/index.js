const boomerangSigner = require("boomerang-signer");
const ethUtil = require('ethereumjs-util');
require('dotenv').config();

boomerangSigner.getSignature("0x8AF0Ba103658814b394e5a61FCeD7033934a97cA", "0x74AF84d40c47Bc7d2fe9294562EcA54eAF4Fa0eA").then((signature) => {
  console.log('v: ' + signature.v);
  console.log('r: ' + ethUtil.bufferToHex(signature.r));
  console.log('s: ' + ethUtil.bufferToHex(signature.s));
});
