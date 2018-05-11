const bs58 = require('bs58');
const conv = require('binstring');

// https://ethereum.stackexchange.com/questions/17094/how-to-store-ipfs-hash-using-bytes#17112

// IPFS hash is actually two concatenated pieces
// 1. multihash identifier, so the first two bytes indicate the hash function being used (0x12 is sha2)
// 2. the size (0x20 is 256-bits long)

// we are removing "1220" from the beginning of the string
export default function ipfsHashInBytes(ipfsHash) {
  console.log(conv(bs58.decode(ipfsHash), { out:'hex' }).slice(4));
  return "0x" + conv(bs58.decode(ipfsHash), { out:'hex' }).slice(4);
}