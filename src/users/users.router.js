const express = require("express");
const createUsers = require("./user.controller.js");
const createUserValidator = require("./validators/createUser.validator.js");
const { StatusCodes } = require("http-status-codes");
const { validationResult } = require("express-validator");

const createUsersRouter = express.Router();

/**
 * @swagger
 * /user/createUser:
 *  post:
 *    summary: Create a new user
 *    tags: [Users]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/User'
 *    responses:
 *      201:
 *        description: User created successfully
 *        content:
 *          application/json:
 *            example:
 *              status: sucess
 *              statusCode: 201
 *              message: Created
 *              data:
 *                _id: 689690156b8bb2e1852fa36f
 *                firstName: john
 *                lastName: Doe
 *                email: jogh@doe.com
 *
 */
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
