const ipfsErrorResponse = function(error){

  return {
    statusCode: 500,
    body: JSON.stringify({
      message: `Unable to store experience on ipfs node. error: ${error}`,
      input: event,
    })
  };
};

export default ipfsErrorResponse;