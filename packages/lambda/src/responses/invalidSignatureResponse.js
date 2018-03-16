const invalidSignatureResponse = {
  statusCode: 401,
  body: JSON.stringify({
    message: `invalid signature`
  })
};

export default invalidSignatureResponse;