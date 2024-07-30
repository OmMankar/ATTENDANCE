// Import the model
const Student = require("../model/student");

// Define a route handler
exports.fetchStudent = async (req, res) => {
  try {
    const { section, department } = req.body;

    //wheter all the details are filled or not
    if (!section || !department) {
      return res.status(400).json({
        success: false,
        message: "Please fill all the details",
      });
    }
    //checking wheter Student with the section exist or not
    if (!(await Student.findOne({ section }))) {
      return res.status(400).json({
        success: false,
        message: "Section details incorrect ",
      });
    }

    const response = await Student.find({ section, branch: department });
    if (response === []) {
      res.status(200).json({
        success: false,
        data: response,
        message: "Student enrolled with this Subject code does'nt exit",
      });
    }
    res.status(200).json({
      success: true,
      data: response,
      message: "Fetched all students successfully",
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
