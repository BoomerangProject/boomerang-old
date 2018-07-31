const createKeccakHash = require('keccak')

function toChecksumAddress () {

  var address = '0xb8e861e1e1c8155831bc5f1026a18c645bc59754'

  address = address.toLowerCase().replace('0x','');
  var hash = createKeccakHash('keccak256').update(address).digest('hex')
  var ret = '0x'

  for (var i = 0; i < address.length; i++) {
    if (parseInt(hash[i], 16) >= 8) {
      ret += address[i].toUpperCase()
    } else {
      ret += address[i]
    }
  }

  console.log(ret)
}

toChecksumAddress()
