const express = require('express');

const userController = require('../controller/user');
const Validator = require('../validations/userValidation');

const signUpValidation = Validator.signUpValidations;

const tokenValidator = require('../middlewares/tokenAuth');

const router = express.Router();

// signup route
router.post(
  '/signup', signUpValidation(), Validator.checkValidationResult, userController.signup,
);

// login route
router.post('/login', Validator.logInValidations(), Validator.checkValidationResult, userController.login);

// logout route
router.post('/logout', tokenValidator, userController.logout);

module.exports = router;
