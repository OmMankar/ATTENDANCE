// Import the model
const Teacher = require("../model/teacher");

// Define a route handler
exports.numberOfClasses = async (req, res) => {
  try {
    const { subjectCode } = req.body;
    const _id = await Teacher.find({ subjectCode: subjectCode });

    const data = await Teacher.find(
      {
        _id,
      },
      {
        dateOfAttendance: 1, // Projection to include only specific fields
      }
    );

    res.status(200).json({
      success: true,
      data: data,
      message: "Suceesfully Found the Number of Classes",
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
