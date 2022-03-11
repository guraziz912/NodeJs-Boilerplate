const { body, validationResult } = require('express-validator');
const validationMessages = require('../messages/validation');

// signup validation
const signUpValidations = () => [
  body('email').isLength({ min: 1 }).withMessage(validationMessages.emailRequired)
    .isEmail()
    .withMessage(validationMessages.emailInvalid),
  body('password').isLength({ min: 5 }).withMessage(validationMessages.passwordRequired),
  body('name').isLength({ min: 1 }).withMessage(validationMessages.nameInvalid),
  body('confirmPassword').isLength({ min: 5 }).withMessage(validationMessages.passwordRequired)
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error(validationMessages.passwordMatch);
      }

      return true;
    }),

];

// login validation
const logInValidations = () => [
  body('email').isLength({ min: 1 }).withMessage(validationMessages.emailRequired)
    .isEmail()
    .withMessage(validationMessages.emailInvalid),
  body('password').isLength({ min: 5 }).withMessage(validationMessages.passwordRequired),
];

// checking all the errors from validations
const checkValidationResult = (req, res, next) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    res.status(422).json({
      error: result.array(),
    });
  } else {
    next();
  }
};

module.exports.signUpValidations = signUpValidations;
module.exports.logInValidations = logInValidations;
module.exports.checkValidationResult = checkValidationResult;
