const apiOkayResponse = (transactionReceipt) => {

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: `success, transaction receipt:
      ${JSON.stringify(transactionReceipt)}`
    })
  };
};

export default apiOkayResponse;