/* eslint-disable max-len */
const bcrypt = require("bcrypt");
const Users = require("../models/users");
const checkUser = require("../service/userService");
// response handler
const responseHandler = require("../utils/responseHandler");
// Success messages
const authSuccessMessages = require("../messages/success/index");
// Failure messages
const authFailureMessages = require("../messages/error/index");
const CustomError = require("../middlewares/error");

const customError = new CustomError();
// token generation
const authToken = require("../utils/generateToken");

// Constants
const constants = require("../utils/constants");

// sending email
const SendEmail = require("../utils/Email");

// signup controller
exports.signup = async (req, res, next) => {
  const { id, name, email } = req.body;
  const { lang } = req.query;
  const uploadedFile = req.file;
  try {
    const userData = await checkUser.getUserByEmail(email);
    if (userData) {
      return customError.apiError(
        constants.unauthorizeStatusCode,
        authFailureMessages[lang].userExist
      );
    }
    // hashing password
    bcrypt.hash(req.body.password, constants.hashSalt, async (err, hash) => {
      if (err || req.body.password !== req.body.confirmPassword) {
        return customError.apiError(
          constants.unauthorizeStatusCode,
          authFailureMessages[lang].encryptionFailed
        );
      }

      const createdUser = await Users.create({
        id,
        name,
        email,
        password: hash,
        file: uploadedFile.path,
      });
      if (createdUser) {
        const sentEmail = new SendEmail();
        const checkEmailSent = await sentEmail.sendHTMLMail(email, name);
        if (checkEmailSent) {
          const token = authToken.generateToken(
            createdUser.email,
            createdUser.id.toString()
          );
          return responseHandler.successResponse(
            res,
            constants.successStatusCode,
            authSuccessMessages[lang].userCreated,
            token
          );
        }
        return customError.apiError(
          constants.unauthorizeStatusCode,
          authFailureMessages[lang].encryptionFailed
        );
      }
      return customError.apiError(
        constants.unauthorizeStatusCode,
        authFailureMessages[lang].userSigninFailed
      );
    });
  } catch (error) {
    next(error);
  }
};

// login controller
exports.login = async (req, res) => {
  const { lang } = req.query;
  const userData = await checkUser.getUserByEmail(req.body.email);
  if (!userData) {
    return customError.apiError(
      constants.unauthorizeStatusCode,
      authFailureMessages[lang].loginFailed
    );
  }

  bcrypt.compare(req.body.password, userData.password, (err, result) => {
    if (!result) {
      return customError.apiError(
        constants.unauthorizeStatusCode,
        authFailureMessages[lang].loginFailed
      );
    }
    const token = authToken.generateToken(
      userData.email,
      userData.id.toString()
    );
    return responseHandler.successResponse(
      res,
      constants.successStatusCode,
      authSuccessMessages[lang].loginSuccess,
      token
    );
  });
};

// logout
exports.logout = async (req, res) => {
  const { lang } = req.query;
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    return customError.apiError(
      constants.genericErrorStatusCode,
      authFailureMessages[lang].loginFailed
    );
  }
  res.setHeader("Authorization", null);
  return responseHandler.successResponse(
    res,
    constants.successStatusCode,
    authSuccessMessages[lang].logoutSuccess
  );
};
