const express = require("express");
const createUsers = require("./user.controller.js");

const createUsersRouter = express.Router();

createUsersRouter.post("/createUser", createUsers.handleCreateUsers);

module.exports = createUsersRouter;
