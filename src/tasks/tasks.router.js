const express = require("express");
const { body, validationResult } = require("express-validator");
const taskController = require("./tasks.controller.js");
const { StatusCodes } = require("http-status-codes");
const tasksRouter = express.Router();

tasksRouter.get("/tasks", taskController.handleGetTasks);

tasksRouter.post(
  "/tasks",
  [
    body("title", "This title cannot be empty").notEmpty(),
    body("title", "This title must be String").isString(),
    body("dueDate", "dueDate needs to be a valid ISO8601 string")
      .notEmpty()
      .isISO8601(),
  ],
  (req, res) => {
    const result = validationResult(req);
    // console.log(result);
    if (result.isEmpty()) {
      return taskController.handlePostTasks(req,res);
    } else {
      res.status(StatusCodes.BAD_REQUEST).json(result.array());
    }
  }
);

tasksRouter.patch("/tasks", taskController.handlePatchTasks);

tasksRouter.delete("/tasks", taskController.handleDeleteTasks);

module.exports = tasksRouter;
