const signedTransactionResponse = (signedTransaction) => {

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: `success`,
      signedTransaction: signedTransaction
    })
  };
};

export default signedTransactionResponse;