const { body } = require("express-validator");

const createUserValidator = [
  body("firstName", "the firstNmae should be string")
    .isString()
    .notEmpty()
    .isLength({ max: 100 })
    .trim(),
  body("lastName", "lastname is a String")
    .isString()
    .optional()
    .isLength({ max: 100 })
    .trim(),
  body("email", "email is a required and must be valid email")
    .isEmail()
    .notEmpty()
    .isLength({ max: 200 })
    .trim(),
  body("password", "email is a required and must be valid email")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    )
    .notEmpty()
    .isLength({ min: 8 }),
];

module.exports = createUserValidator;
