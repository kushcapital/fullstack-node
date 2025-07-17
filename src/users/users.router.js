const express = require("express");
const createUsers = require("./user.controller.js");
const createUserValidator = require("./validators/createUser.validator.js");
const { StatusCodes } = require("http-status-codes");
const { validationResult } = require("express-validator");

const createUsersRouter = express.Router();

createUsersRouter.post("/createUser", createUserValidator, (req, res) => {
  const result = validationResult(req);
  if (result.isEmpty()) {
    return createUsers.handleCreateUsers(req, res);
  } else {
    res.status(StatusCodes.BAD_REQUEST).json(result.array());
  }
  //     createUsers.handleCreateUsers
});

module.exports = createUsersRouter;
