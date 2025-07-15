const { body } = require("express-validator");
const { matchedData } = require("express");

const createTaskValidator = [
  body("title", "This title cannot be empty").notEmpty(),
  body("title", "This title must be String").isString(),
  body("title").isLength({ max: 100 }),
  body("title").trim(),
  body("dueDate", "dueDate needs to be a valid ISO8601 string")
    .notEmpty()
    .isISO8601(),
  body("description", "the description cannot be empty and needs to be string")
    .notEmpty()
    .isString()
    .trim(),
  body("description", "the description cannot be more then 500 chars").isLength(
    { max: 500 }
  ),
  body("priority").isIn(["low", "normal", "high"]),
  body("status").isIn(["todo", "inProgress", "completed"]),
];

module.exports = createTaskValidator;
