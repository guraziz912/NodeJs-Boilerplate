const User = require('../models/users');

// Getting users by email
const getUserByEmail = async (email) => {
  const userFound = await User.findOne({ where: { email } });
  return userFound;
};

// creating user
const createUser = async (userBody) => {
  const user = await User.create(userBody);
  return user;
};
module.exports = { getUserByEmail, createUser };
