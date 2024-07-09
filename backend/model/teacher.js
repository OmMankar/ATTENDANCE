const mongoose = require("mongoose");
const teacherSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxLength: 50,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    department: {
      type: String,
      required: true,
      maxLength: 50,
    },
    section: {
      type: Array,
      required: true,
      default: [],
    },
    dateOfAttendance: {
      type: [
        {
          date: { type: String, required: true },
          subjectCode: { type: String, required: true },
        },
      ],

      default: [],
    },
    subjectCode: {
      type: Array,
      default: [],
    },
  },
  { versionKey: false }
);
module.exports = mongoose.model("Teacher", teacherSchema);
