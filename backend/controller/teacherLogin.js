// Import the model
const Teacher = require("../model/teacher");
const bcrypt = require("bcryptjs");
// Define a route handler
exports.teacherLogin = async (req, res) => {
  try {
    // Extract title and description from request body
    const { emailId, subjectCode, password } = req.body;

    //wheter all the details are filled or not
    if (!emailId || !password || !subjectCode) {
      return res.status(400).json({
        success: false,
        message: "Please fill all the details",
      });
    }
    //checking wheter Teacher with the email is already registered or not
    if (!(await Teacher.findOne({ email: emailId }))) {
      return res.status(400).json({
        success: false,
        message: "Teacher with given Email Id not found",
      });
    }
    const TeacherData = await Teacher.findOne({ email: emailId });

    //checking for subjectCode
    if (!TeacherData.subjectCode.includes(subjectCode)) {
      return res.status(400).json({
        success: false,
        message: "Teacher with given subjectCode not found",
      });
    }

    await bcrypt.compare(password, TeacherData.password, (err, data) => {
      //if error than throw error
      if (err) throw err;

      //if both match than you can do anything
      if (data) {
        TeacherData.password = null;
        return res.status(200).json({
          success: true,
          data: TeacherData,
          message: "Logged In successfully",
        });
      } else {
        return res.status(401).json({ message: "Invalid Password" });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
