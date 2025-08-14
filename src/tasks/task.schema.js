const { Schema, model } = require("mongoose");

const taskSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Task title is required"],
      trim: true,
      maxLength: [100, "Title cannot be more than 100 characters"],
    },
    description: {
      type: String,
      required: [true, "Task title is required"],
      trim: true,
      maxLength: [500, "Title cannot be more than 500 characters"],
    },
    status: {
      type: String,
      required: [true, "Task status is required"],
      enum: ["todo", "inProgress", "completed"],
      default: "todo",
    },
    priority: {
      type: String,
      required: [true, "Task priority is required"],
      enum: ["low", "normal", "high"],
      default: "normal",
    },
    dueDate: {
      type: Date,
      required: [true, "Task due date is required"],
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

const Task = model("Task", taskSchema);
module.exports = Task;

/**
 * @swagger
 * components:
 *   schemas:
 *     Task:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - status
 *         - priority
 *         - dueDate
 *       properties:
 *         title:
 *           type: string
 *           description: The title of the task
 *           maxLength: 100
 *         description:
 *           type: string
 *           description: The description of the task
 *           maxLength: 500
 *         status:
 *           type: string
 *           description: The status of the task
 *           enum: ["todo", "inProgress", "completed"]
 *           default: "todo"
 *         priority:
 *           type: string
 *           description: The priority of the task
 *           enum: ["low", "normal", "high"]
 *           default: "normal"
 *         dueDate:
 *           type: string
 *           format: date
 *           description: The due date of the task
 *       example:
 *         title: "Complete project documentation"
 *         description: "Write comprehensive documentation for the new project including API references and user guides"
 *         status: "todo"
 *         priority: "high"
 *         dueDate: "2024-01-15"
 */
