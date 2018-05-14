const signedTransactionResponse = (signedTransaction) => {

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: `success, signedTransaction: ${JSON.stringify(signedTransaction)}`,
      signedTransaction: signedTransaction
    })
  };
};

export default signedTransactionResponse;