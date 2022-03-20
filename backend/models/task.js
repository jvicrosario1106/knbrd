const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = Schema(
  {
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
    },
    column: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Column",
    },
    name: {
      type: String,
    },
    description: {
      type: String,
    },
    label: [{ type: mongoose.Schema.Types.ObjectId, ref: "Label" }],
    assignees: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    priority: {
      type: String,
    },
  },
  { timestamps: true }
);

const Task = mongoose.model("Task", taskSchema);
module.exports = Task;
