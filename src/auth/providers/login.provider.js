const { matchedData } = require("express-validator");
const { StatusCodes } = require("http-status-codes");
const errorLogger = require("../../helpers/errorLogger.helper.js");
const User = require("../../users/user.schema.js");
const bcrypt = require("bcrypt");

async function loginProvider(req, res) {
  const validatedData = matchedData(req);
  try {
    // Find user by email
    const user = await User.findOne({ email: validatedData.email });
    
    if (!user) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        reason: "Invalid email or password",
      });
    }
    
    // Check password
    const isPasswordValid = await bcrypt.compare(validatedData.password, user.password);
    
    if (!isPasswordValid) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        reason: "Invalid email or password",
      });
    }
    
    // Login successful - return user info (excluding password)
    const { password, ...userInfo } = user.toObject();
    return res.status(StatusCodes.OK).json({
      message: "Login successful",
      user: userInfo,
    });
  } catch (error) {
    errorLogger("Error while trying to login", req, error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      reason: "Unable to process your request at the moment, please try later.",
    });
  }
}

module.exports = loginProvider;
