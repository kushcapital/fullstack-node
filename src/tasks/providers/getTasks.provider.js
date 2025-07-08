const Task = require("../task.schema.js");

async function getTasksProvier(reqn, res) {
  return await Task.find();
}

module.exports = getTasksProvier;
