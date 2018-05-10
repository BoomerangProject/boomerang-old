const s3errorResponse = (error) => {

  return {
    statusCode: 500,
    body: JSON.stringify({
      message: 'Unable to store file on S3.',
      error: error
    })
  };
};

export default s3errorResponse;