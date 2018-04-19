const ipfsOkayResponse = (ipfsHash) => {

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: `success, pinned ${ipfsHash}`
    })
  };
};

export default ipfsOkayResponse;