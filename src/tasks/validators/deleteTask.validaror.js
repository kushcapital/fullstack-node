const { body } = require("express-validator");

const deleteTaskValidator = [
  body("_id", "valid document Id is required").notEmpty().isMongoId(),
];

module.exports = deleteTaskValidator;
