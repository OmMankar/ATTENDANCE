const mongoose = require("mongoose");
const studenSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxLength: 50,
    },
    scholarNumber: {
      type: Number,
      required: true,
      max: 999999999,
    },
    branch: {
      type: String,
      required: true,
    },
    section: {
      type: String,
      required: true,
      maxLength: 2,
    },
    absent: {
      type: [
        {
          date: { type: String, required: true },
          subjectCode: { type: String, required: true },
        },
      ],
      default: [],
    },
    subjects: {
      type: Array,
      default: [],
    },
  },
  { versionKey: false }
);
module.exports = mongoose.model("Student", studenSchema);
