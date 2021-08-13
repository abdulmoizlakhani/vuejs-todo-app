const mongoose = require("mongoose");

const TodoSchema = mongoose.Schema(
  {
    text: { type: String, required: true, trim: true },
    editMode: { type: Boolean, default: false },
    done: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Todo", TodoSchema);
