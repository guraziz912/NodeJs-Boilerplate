const jwt = require('jsonwebtoken');
// Failure messages
const authFailureMessages = require('../messages/error/eng');
// Constants
const constants = require('../utils/constants');

module.exports = (req, res, next) => {
  const authHeader = req.get('Authorization');
  if (!authHeader) {
    const error = new Error(authFailureMessages.authenticationFail);
    error.statusCode = constants.unauthorizeStatusCode;
    throw error;
  }
  const token = authHeader.split(' ')[1];
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
  } catch (err) {
    err.statusCode = constants.genericErrorStatusCode;
    throw err;
  }
  if (!decodedToken) {
    const error = new Error(authFailureMessages.authenticationFail);
    error.statusCode = constants.unauthorizeStatusCode;
    throw error;
  }
  req.userId = decodedToken.userId;
  next();
};
