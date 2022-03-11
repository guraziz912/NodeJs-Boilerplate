const jwt = require('jsonwebtoken');

const generateToken = (email, userId) => jwt.sign(
  {
    email,
    userId,
  },
  process.env.TOKEN_SECRET,
  { expiresIn: process.env.TOKEN_EXPIRY },
);

module.exports = {
  generateToken,
};
