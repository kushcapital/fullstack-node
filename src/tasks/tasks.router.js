const express = require("express");
const { validationResult } = require("express-validator");
const taskController = require("./tasks.controller.js");
const { StatusCodes } = require("http-status-codes");
const tasksRouter = express.Router();
const createTaskValidator = require("./validators/createTask.validator.js");
const getTaskValidator = require("./validators/getTasks.validator.js");
const updateTaskValidator = require("./validators/updateTask.validator.js");
const deleteTaskValidator = require("./validators/deleteTask.validaror.js");
const authenticateToken = require("../middleware/authticateToken.middleware.js");

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 * /tasks:
 *  get:
 *    summary: Get all the tasks
 *    tags: [Tasks]
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - in: query
 *        name: limit
 *        schema:
 *          type: integer
 *          default: 10
 *        description: The number of tasks needed in a single response
 *      - in: query
 *        name: page
 *        schema:
 *          type: integer
 *          default: 1
 *        description: This is the page number of the tasks response
 *      - in: query
 *        name: order
 *        schema:
 *          type: integer
 *          default: 'asc'
 *          enum: ['asc','dsc']
 *        description: order of tasks
 *    responses:
 *      200:
 *        description: Task created successfully
 *        content:
 *          application/json:
 *            example:
 *              status: sucess
 *              statusCode: 200
 *              message: ok
 *              data:
 *               -  _id: 689690156b8bb2e1852fa36f
 *                  title: Create a new video
 *                  description: A video about fullstack web development
 *                  status: todo
 *                  priority: high
 *                  dueDate: 2024-01-15
 *
 *      401:
 *        description: Not Authorized Error
 *        content:
 *          application/json:
 *            example:
 *              status: error
 *              statusCode: 401
 *              message: unauthorized
 *              error:
 *                message: "You are not authorized to perform this request "
 *
 *      403:
 *        description: Forbidden Error
 *        content:
 *          application/json:
 *            example:
 *              status: error
 *              statusCode: 403
 *              message: Forbidden
 *              error:
 *                message: Please login agian, invalid token.
 *
 */

tasksRouter.get("/tasks", [getTaskValidator, authenticateToken], (req, res) => {
  const result = validationResult(req);
  if (result.isEmpty()) {
    return taskController.handleGetTasks(req, res);
  } else {
    res.status(StatusCodes.BAD_REQUEST).json(result.array());
  }
});

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 * /tasks:
 *  post:
 *    summary: Create a new task
 *    tags: [Tasks]
 *    security:
 *      - bearerAuth: []
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Task'
 *    responses:
 *      201:
 *        description: Task created successfully
 *        content:
 *          application/json:
 *            example:
 *              status: sucess
 *              statusCode: 201
 *              message: Created
 *              data:
 *                _id: 689690156b8bb2e1852fa36f
 *                title: Create a new video
 *                description: A video about fullstack web development
 *                status: todo
 *                priority: high
 *                dueDate: 2024-01-15
 *
 *      401:
 *        description: Not Authorized Error
 *        content:
 *          application/json:
 *            example:
 *              status: error
 *              statusCode: 401
 *              message: unauthorized
 *              error:
 *                message: "You are not authorized to perform this request "
 *
 *      403:
 *        description: Forbidden Error
 *        content:
 *          application/json:
 *            example:
 *              status: error
 *              statusCode: 403
 *              message: Forbidden
 *              error:
 *                message: Please login agian, invalid token.
 *
 */

tasksRouter.post(
  "/tasks",
  [createTaskValidator, authenticateToken],
  (req, res) => {
    const result = validationResult(req);
    if (result.isEmpty()) {
      return taskController.handlePostTasks(req, res);
    } else {
      res.status(StatusCodes.BAD_REQUEST).json(result.array());
    }
  }
);

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 * /tasks:
 *  patch:
 *    summary: update the task
 *    tags: [Tasks]
 *    security:
 *      - bearerAuth: []
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/TaskUpdate'
 *    responses:
 *      200:
 *        description: Task updated successfully
 *        content:
 *          application/json:
 *            example:
 *              status: sucess
 *              statusCode: 200
 *              message: Ok
 *              data:
 *                _id: 689690156b8bb2e1852fa36f
 *                title: Create a new video
 *                description: A video about fullstack web development
 *                status: todo
 *                priority: high
 *                dueDate: 2024-01-15
 *
 *      401:
 *        description: Not Authorized Error
 *        content:
 *          application/json:
 *            example:
 *              status: error
 *              statusCode: 401
 *              message: unauthorized
 *              error:
 *                message: "You are not authorized to perform this request "
 *
 *      403:
 *        description: Forbidden Error
 *        content:
 *          application/json:
 *            example:
 *              status: error
 *              statusCode: 403
 *              message: Forbidden
 *              error:
 *                message: Please login agian, invalid token.
 *
 */

tasksRouter.patch(
  "/tasks",
  [updateTaskValidator, authenticateToken],
  (req, res) => {
    const result = validationResult(req);
    if (result.isEmpty()) {
      return taskController.handlePatchTasks(req, res);
    } else {
      res.status(StatusCodes.BAD_REQUEST).json(result.array());
    }
  }
);

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 * /tasks:
 *  delete:
 *    summary: Delete the task
 *    tags: [Tasks]
 *    security:
 *      - bearerAuth: []
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/TaskDelete'
 *    responses:
 *      200:
 *        description: Task deleted successfully
 *        content:
 *          application/json:
 *            example:
 *              status: sucess
 *              statusCode: 200
 *              message: Ok
 *              data:
 *                acknowledged: true
 *                deletedCount: 1
 *
 *      401:
 *        description: Not Authorized Error
 *        content:
 *          application/json:
 *            example:
 *              status: error
 *              statusCode: 401
 *              message: unauthorized
 *              error:
 *                message: "You are not authorized to perform this request "
 *
 *      403:
 *        description: Forbidden Error
 *        content:
 *          application/json:
 *            example:
 *              status: error
 *              statusCode: 403
 *              message: Forbidden
 *              error:
 *                message: Please login agian, invalid token.
 *
 */
tasksRouter.delete(
  "/tasks",
  [deleteTaskValidator, authenticateToken],
  (req, res) => {
    const result = validationResult(req);
    if (result.isEmpty()) {
      return taskController.handleDeleteTasks(req, res);
    } else {
      res.status(StatusCodes.BAD_REQUEST).json(result.array());
    }
  }
);

module.exports = tasksRouter;
