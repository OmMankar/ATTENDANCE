// Import the model
const Student = require("../model/student");

// Define a route handler
exports.createStudent = async (req, res) => {
  try {
    const response = await Student.create(req.body);
    res.status(200).json({
      success: true,
      data: response,
      message: "Entry created successfully",
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
