// Import the model
const Student = require("../model/student");

// Define a route handler
exports.setStudentAttendance = async (req, res) => {
  try {
    const { subjectCode } = req.body;
    const { _id } = req.params;
    const date = new Date();

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    // This arrangement can be altered based on how we want the date's format to appear.
    let currentDate = `${year}-${month}-${day}`;
    console.log(currentDate);
    const data = await Student.updateOne(
      { _id }, // Ensure this matches your schema field
      { $push: { absent: { date: currentDate, subjectCode: subjectCode } } },
      { new: true }
    );

    res.status(200).json({
      success: true,
      data: data,
      message: "updated student successfully",
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
