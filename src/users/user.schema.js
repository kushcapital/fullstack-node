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
