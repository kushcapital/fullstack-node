const { query } = require("express-validator");

const getTaskValidator = [
  query("limit", "limit must be valid int").optional().isInt().toInt(),
  query("page", "page must be valid int").optional().isInt().toInt(),
  query("order", "order must be one of ['asc', 'dsc'];")
    .optional()
    .isIn(["asc", "dsc"]),
];

module.exports = getTaskValidator;
