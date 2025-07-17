const { StatusCodes } = require("http-status-codes");
const createUserProvider = require("./providers/createUserProvider.js");

async function handleCreateUsers(req, res) {
  return await createUserProvider(req, res);
}

module.exports = { handleCreateUsers };
