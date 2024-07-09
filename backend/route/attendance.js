const express = require("express");
const router = express.Router();

//import controller
const { studentLogin } = require("../controller/studentLogin");
const { teacherLogin } = require("../controller/teacherLogin");
const { createTeacher } = require("../controller/createTeacher");
const { createStudent } = require("../controller/createStudent");
const { fetchStudent } = require("../controller/fecthStudents");
const { setStudentAttendance } = require("../controller/SetStudentAttendance");
const { dateOfAttendance } = require("../controller/dateOfAttendance");
const { numberOfClasses } = require("../controller/numberOfClasses");

//define api routes
router.post("/create/student", createStudent);
router.post("/teacher", teacherLogin);
router.post("/teacher/fetchStudent", fetchStudent);
router.post("/teacher/DateOfAttendance/:_id", dateOfAttendance);
router.post("/teacher/numberOfClasses", numberOfClasses),
  router.post("/student", studentLogin);
router.post("/create/teacher", createTeacher);
router.post("/teacher/fetchStudent/:_id", setStudentAttendance);
router;

module.exports = router;
