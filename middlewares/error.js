module.exports = class CustomError {
  apiError(statusCode, message) {
    const error = new Error();
    error.statusCode = statusCode;
    error.message = message;
    throw error;
  }
};
