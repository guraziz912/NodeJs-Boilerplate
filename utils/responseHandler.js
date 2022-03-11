/* eslint-disable max-len */
// Resopnse handler for GET request
exports.successResponseWithData = (res, statusCode, message, token, data) => res.status(statusCode).json({
  success: true,
  message,
  data: {
    token,
    data,
  },
});

exports.successResponse = (res, statusCode, message, token) => res.status(statusCode).json({
  success: true,
  message,
  token,

});
