const Teacher = require("../model/teacher");
const bcrypt = require("bcryptjs");
// define route handler
exports.createTeacher = async (req, res) => {
  try {
    //extract detail from req body
    const {
      name,
      email,
      password,
      department,
      section,
      dateOfAttendance,
      subjectCode,
    } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newTeacher = await Teacher.create({
      name,
      email,
      password: hashedPassword,
      department,
      section,
      dateOfAttendance,
      subjectCode,
    });
    //sending response
    res.status(200).json({
      success: true,
      data: req.body,
      message: "Create the Teacher in db successfully ",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
      message: "server error ",
    });
  }
};
