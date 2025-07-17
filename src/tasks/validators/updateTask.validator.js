const { body } = require("express-validator");

const updateTaskValidator = [
  body("_id", "valid document Id is required").notEmpty().isMongoId(),
  body("title", "Title must be string").optional().isString().trim(),
  body("title", "The length cannot be more than 100 chars").isLength({
    max: 100,
  }),
  body("dueDate", "dueDate needs to be a valid ISO8601 string")
    .optional()
    .isISO8601(),
  body("description", "the description cannot be empty and needs to be string")
    .optional()
    .isString()
    .trim(),
  body("description", "the description cannot be more then 500 chars").isLength(
    { max: 500 }
  ),
  body("priority").isIn(["low", "normal", "high"]).optional(),
  body("status").isIn(["todo", "inProgress", "completed"]).optional(),
];

module.exports = updateTaskValidator;
