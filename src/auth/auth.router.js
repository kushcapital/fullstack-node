const express = require("express");
const authcontroller = require("./auth.controller.js");
const { StatusCodes } = require("http-status-codes");
const loginValidaror = require("./validarots/login.validator.js");
const { validationResult } = require("express-validator");

const authRouter = express.Router();

authRouter.post("/login", loginValidaror, (req, res) => {
  const result = validationResult(req);

  if (result.isEmpty()) {
    return authcontroller.handlelogin(req, res);
  } else {
    res.status(StatusCodes.BAD_REQUEST).json(result.array());
  }
});

module.exports = authRouter;
