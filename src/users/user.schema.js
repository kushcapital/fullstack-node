const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, "firstName is required"],
      trim: true,
      maxLength: [100, "The character limit is 100"],
    },
    lastName: {
      type: String,
      required: [true, "lastName is required"],
      trim: true,
      maxLength: [100, "The character limit is 100"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      unique: true,
      lowercase: true,
      validate: {
        validator: function (email) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        },
        message: () => `Please enter a valid email address`,
      },
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      
    },
  },
  { timestamps: true, versionKey: false }
);

const User = model("user", userSchema);

module.exports = User;


/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - firstName
 *         - email
 *         - password
 *       properties:
 *         firstName:
 *           type: string
 *           description: The firstName of the user
 *           maxLength: 100
 *         lastName:
 *           type: string
 *           description: The lastName of the user
 *           maxLength: 100
 *         email:
 *           type: string
 *           description: A valid email address
 *         password:
 *           type: string
 *           description: Must contain atleast character and also a numberm a capital letter and a special character
 *       example:
 *         firstName: john
 *         lastName: Doe
 *         email: jogh@doe.com
 *         password: Password123#
 */