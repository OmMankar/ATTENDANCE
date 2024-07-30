import { createContext } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const TeacherContext = createContext({
  //using emailId to identify the loggeed in user
  subjectCode: "",
  teacherDetails:"",
  students:[],
  status:"",
  handleTeacherDetails:()=>{},
  handleStudentsData:()=>{},
  handleSubjectCode:()=>{},
  handleAttendanceOver:()=>{}

 
});

const TeacherContextProvider = ({ children }) => {
 
  const [subjectCode, setSubjectCode] = useState("");
    let [status, setStatus] = useState("");
    let [teacherDetails, setteacherDetails] = useState("");

  const [students,setStudents]=useState([]);
  
  const handleSubjectCode=(subjectCode)=>{
    setSubjectCode(subjectCode);
   
    return;
  }
  const handleTeacherDetails = (data)=> {
    setteacherDetails(data.data);
    
  };
  // upodate the store
  const handleStudentsData=(data)=>{
    setStudents([...data]);
    setStatus('teacher');

  }
  const navigate=useNavigate();
 
  const handleAttendanceOver=async()=>{
    if(subjectCode!=""){
      
    const saveDate=await  fetch(`https://attendance-psi-sand.vercel.app/teacher/DateOfAttendance/${teacherDetails._id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subjectCode
        }),
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          if (!data.success) {
            alert(data.message);
          } else {
           
            alert("Attendance Completed and Logged Out successfully");
            navigate('/');
            teacherDetails="";
            setStudents([]);
            setStatus("");
            

          }
        });
      
    }
  }
 
  


  return (
    <TeacherContext.Provider
      value={{
        
        handleTeacherDetails,
        handleSubjectCode,
        handleStudentsData,
        handleAttendanceOver,
        status,
        subjectCode,
       students,
       teacherDetails,

      }}
    >
      {children}
    </TeacherContext.Provider>
  );
};
export default TeacherContextProvider;
