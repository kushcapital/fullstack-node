const { StatusCodes, ReasonPhrases } = require("http-status-codes");
const Task = require("../task.schema.js");
const { matchedData } = require("express-validator");
const logger = require("../../helpers/winston.helper.js");

async function createTaskProvider(req, res) {
  try {
    const validatedResult = matchedData(req);
    const task = new Task(validatedResult);
    await task.save();
    return res.status(StatusCodes.CREATED).json(task);
  } catch (error) {
    logger.error(`Errror creating a new task: ${error.message}`, {
      metadata: {
        errorCode: error.code,
        errorName: error.name,
        method: req.method,
        url: req.originalUrl,
        body: req.body,
        error: error,
      },
    });
    return res.status(StatusCodes.GATEWAY_TIMEOUT).json({
      reason: "unable to process your request at the moment, please try later.",
    });
  }
}

module.exports = createTaskProvider;
