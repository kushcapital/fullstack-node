const { StatusCodes, ReasonPhrases } = require("http-status-codes");
const Task = require("../task.schema.js");
const { matchedData } = require("express-validator");

async function createTaskProvider(req, res) {
  try {
    const validatedResult = matchedData(req);
  
    const task = new Task(validatedResult);
    await task.save();
    res.status(StatusCodes.CREATED).json(task);
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(StatusCodes.BAD_REQUEST).json({
        error: "Validation failed",
        details: error.message,
      });
    }
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "Internal server error",
      details: error.message,
    });
  }
}

module.exports = createTaskProvider;
