const errorResponse = (errorMessage='error') => {

  return {
    statusCode: 400,
    body: JSON.stringify({
      message: errorMessage
    })
  };
};

export default errorResponse;