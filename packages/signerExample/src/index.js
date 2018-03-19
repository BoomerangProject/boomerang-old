const kudosSigner = require("kudos-signer/lib/kudosSigner");

const signature = kudosSigner.getSignature("0x5b7789a67c868855505b342dcf07a176898958d6", "ben@letskedaddle.com");

console.log(signature);
