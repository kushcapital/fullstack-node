const express = require("express");
const authcontroller = require("./auth.controller.js");
const { StatusCodes } = require("http-status-codes");
const loginValidaror = require("./validarots/login.validator.js");
const { validationResult } = require("express-validator");
const authRouter = express.Router();

/**
 * @swagger
 * /auth/login:
 *  post:
 *    summary: User login
 *    tags: [Authentication]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/login'
 *    responses:
 *      200:
 *        description: User login successfully
 *        content:
 *          application/json:
 *            example:
 *              status: sucess
 *              statusCode: 200
 *              message: Ok
 *              data:
 *                acessToken: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2ODk1NGEyYmU1NjU0YjM1ZjgyYzgzZjQiLCJlbWFpbCI6InJhbWVvQGJhbi5jb20iLCJpYXQiOjE3NTUxNTQ2MjgsImV4cCI6MTc1NTI0MTAyOH0.gODJTPBHFjQqn4VnnKoVwtKOIA_v3XFjbtb7n4ZiamE
 *
 */
authRouter.post("/login", loginValidaror, (req, res) => {
  const result = validationResult(req);

  if (result.isEmpty()) {
    return authcontroller.handlelogin(req, res);
  } else {
    res.status(StatusCodes.BAD_REQUEST).json(result.array());
  }
});

module.exports = authRouter;

/**
 * @swagger
 * components:
 *   schemas:
 *     login:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           description: A valid email address
 *         password:
 *           type: string
 *           description: Must contain atleast character and also a numberm a capital letter and a special character
 *       example:
 *         email: jogh@doe.com
 *         password: Password123#
 */
