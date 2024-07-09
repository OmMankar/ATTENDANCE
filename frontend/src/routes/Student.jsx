import { useContext } from "react";
import StudentAuthentication from "../component/StudentAuthentication";
import SubjectCodeWise from "../component/SubjectCodeWise";
import { StudentContext } from "../store/student-store";

const Student=()=>{
  const {status}=useContext(StudentContext);
  return <>
  {status === "" ? <StudentAuthentication /> : <SubjectCodeWise />}

  
  </>
}
export default Student;