const { query } = require("express-validator");

const getTaskValidator = [
  query("limit", "limit must be valid int")
    .optional()
    .isInt()
    .toInt({ min: 1 }),
  query("limit").customSanitizer((value, { req }) => {
    return value ? value : 5;
  }),
  query("page", "page must be valid int").optional().isInt().toInt(),
  query("page").customSanitizer((value, { req }) => {
    return value ? value : 1;
  }),
  query("order", "order must be one of ['asc', 'dsc'];")
    .optional()
    .isIn(["asc", "dsc"]),
  query("order").customSanitizer((value, { req }) => {
    return value ? value : "asc";
  }),
];

module.exports = getTaskValidator;
