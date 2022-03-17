const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const columnSchema = Schema(
  {
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
    },
    name: {
      type: String,
    },
    order: {
      type: Number,
      default: 0,
    },
    task: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }],
  },
  { timestamps: true }
);

const Column = mongoose.model("Column", columnSchema);
module.exports = Column;
