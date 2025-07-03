const express = require("express")
const authcontroller = require("./auth.controller.js")


const authRouter = express.Router()

authRouter.post("/login",authcontroller.handlelogin)

module.exports = authRouter;