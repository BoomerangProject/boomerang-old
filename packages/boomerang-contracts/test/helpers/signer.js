import { soliditySHA3 } from 'ethereumjs-abi';
import { bufferToHex, ecsign, hashPersonalMessage } from 'ethereumjs-util';

const privateKeyOfTheBusiness = '2413fffb1c65c4da92322c52e1b609c2f69b19e14cb178ec06d8ee63dc622f73';
const businessAddress = '0x8AF0Ba103658814b394e5a61FCeD7033934a97cA';

export default class Signer {

  constructor(address) {
    this.address = address;
    this.nonceValue = 0;
  }

  async getSignature(address) {

    const message = soliditySHA3(
      [ 'address', 'uint256' ],
      [ this.address, this.nonceValue ]);

    const messageHash = hashPersonalMessage(message);

    const privateKey = new Buffer(privateKeyOfTheBusiness, 'hex');
    const signature = await ecsign(messageHash, privateKey);

    let sig = {};
    sig.v = signature.v;
    sig.r = bufferToHex(signature.r);
    sig.s = bufferToHex(signature.s);

    this.nonceValue = this.nonceValue + 1;
    return sig;
  };

  getBusinessAddress() {
    return businessAddress;
  }
}