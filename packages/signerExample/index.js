const boomerangSigner = require("boomerang-signer");
const ethUtil = require('ethereumjs-util');
require('dotenv').config();

boomerangSigner.getSignature("0xd0a287acbc9b2b4222c5ea38dc0f8f1031b0e5ce", "0x71248354c8C2951d0026972CF44213E737D6E3d8").then((signature) => {
  console.log('v: ' + signature.v);
  console.log('r: ' + ethUtil.bufferToHex(signature.r));
  console.log('s: ' + ethUtil.bufferToHex(signature.s));
});
