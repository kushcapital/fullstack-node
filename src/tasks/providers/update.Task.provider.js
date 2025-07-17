const Task = require("../task.schema.js");
const { matchedData } = require("express-validator");
const { StatusCodes } = require("http-status-codes");
const errorLogger = require("../../helpers/errorLogger.helper.js");

async function updateTaskProvider(req, res) {
  const validatedData = matchedData(req);

  try {
    //fetch id from validated data
    const task = await Task.findById(validatedData._id);

    if (!task) {
      return res.status(StatusCodes.NOT_FOUND).json({
        reason: "Task not found",
      });
    }

    //update the task with validated data
    task.title = validatedData.title || task.title;
    task.description = validatedData.description || task.description;
    task.dueDate = validatedData.dueDate || task.dueDate;
    task.status = validatedData.status || task.status;
    task.priority = validatedData.priority || task.priority;
    //save
    await task.save();

    return res.status(StatusCodes.OK).json(task);
  } catch (error) {
    errorLogger("Error while updating tasks", req, error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      reason: "Unable to process your request at the moment, please try later.",
    });
  }
}

module.exports = updateTaskProvider;
