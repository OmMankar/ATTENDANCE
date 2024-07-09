import { useContext } from "react";
import { TeacherContext } from "../store/teacher-store";
import Card from "./Card";

const DisplayStudents=()=>{
  const { students,handleAttendanceOver}=useContext(TeacherContext);
  return<>
  {students.map(item=><Card item={item}/>)}
  <button onClick={handleAttendanceOver}>Done</button>
  </>
  
}
export default DisplayStudents;