const { body } = require("express-validator");

const loginValidaror = [
  body("email").isEmail().notEmpty().trim(),
  body("password").isLength({ min: 8 }).isString(),
];

module.exports = loginValidaror;
