const { StatusCodes, ReasonPhrases } = require("http-status-codes");
const Task = require("../task.schema.js");
const { matchedData } = require("express-validator");
const errorLogger = require("../../helpers/errorLogger.helper.js")

async function createTaskProvider(req, res) {
  try {
    const validatedResult = matchedData(req);
    const task = new Task(validatedResult);
    await task.save();
    return res.status(StatusCodes.CREATED).json(task);
  } catch (error) {
    errorLogger(`Errror creating a new task: ${error.message}`,req,error);
   
    return res.status(StatusCodes.GATEWAY_TIMEOUT).json({
      reason: "unable to process your request at the moment, please try later.",
    });
  }
}

module.exports = createTaskProvider;
