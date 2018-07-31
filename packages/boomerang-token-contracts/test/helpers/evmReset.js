export default function evmReset() {
  return new Promise((resolve, reject) => {
    web3.currentProvider.sendAsync({
      jsonrpc: '2.0',
      method: 'evm_reset',
      id: new Date().getTime()
    }, (err, res) => {
      return err ? reject(err) : resolve(res)
    })
  })
}
