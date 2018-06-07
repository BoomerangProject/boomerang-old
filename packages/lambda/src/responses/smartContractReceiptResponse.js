const signedTransactionResponse = (signedTransaction, nonceValue) => {

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: `success`,
      signedTransaction: signedTransaction,
      nonceValue: nonceValue
    })
  };
};

export default signedTransactionResponse;