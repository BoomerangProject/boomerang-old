const boomerangSigner = require("boomerang-signer");
require('dotenv').config();

boomerangSigner.getSignature("0x8715db79576978f5118aa96bc3ed5d70fca68448", "0x71248354c8C2951d0026972CF44213E737D6E3d8").then((signature) => {
  console.log(signature);
});
