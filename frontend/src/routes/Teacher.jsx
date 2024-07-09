import TeacherAuthentication from "../component/TeacherAuthentication";
import TeacherView from "../component/TeacherView";
import DisplayStudents from "../component/DisplayStudents";
import { useContext } from "react";
import { TeacherContext } from "../store/teacher-store";

const Teacher=()=>{
  const { subjectCode,students}=useContext(TeacherContext);
  return <>
  {subjectCode==="" && <TeacherAuthentication/>}
  {subjectCode!=="" && students.length===0 && <TeacherView/>}
  {students.length!==0 && <DisplayStudents/>}
  
  </>
}
export default Teacher;