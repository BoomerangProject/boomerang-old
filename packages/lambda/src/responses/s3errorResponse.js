const s3errorResponse = async (error) => {

  return {
    statusCode: 500,
    body: JSON.stringify({
      message: 'Unable to store review on S3.',
      error: error
    })
  };
};

export default s3errorResponse;