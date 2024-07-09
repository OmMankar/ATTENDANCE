// Import the model

const Student = require("../model/student");

// Define a route handler
exports.studentLogin = async (req, res) => {
  try {
    // Extract title and description from request body
    const { scholarNo } = req.body;

    //wheter all the details are filled or not
    if (!scholarNo) {
      return res.status(400).json({
        success: false,
        message: "Please fill all the details",
      });
    }

    //checking wheter user with the scholar No. exist or not
    if (!(await Student.findOne({ scholarNumber: scholarNo }))) {
      return res.status(400).json({
        success: false,
        message: "User with given Scholar No. not found",
      });
    }
    const userData = await Student.findOne({ scholarNumber: scholarNo });

    return res.status(200).json({
      success: true,
      data: userData,
      message: "Logged In successfully",
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
