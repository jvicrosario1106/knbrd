const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const columnSchema = Schema(
  {
    name: {
      type: String,
    },
    order: {
      type: Number,
    },
    task: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }],
  },
  { timestamps: true }
);

const Column = mongoose.model("Column", columnSchema);
module.exports = Column;
