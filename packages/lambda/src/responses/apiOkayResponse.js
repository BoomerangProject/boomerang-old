const apiOkayResponse = (transactionHash) => {

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: `success, transaction hash: ${transactionHash}`
    })
  };
};

export default apiOkayResponse;