export default function revertToSnapshot(snapShotId) {
  return new Promise((resolve, reject) => {
    web3.currentProvider.sendAsync({
      jsonrpc: '2.0',
      method: 'evm_revert',
      params: [snapShotId],
      id: new Date().getTime()
    }, (err, res) => {
      return err ? reject(err) : resolve(res)
    })
  })
}
