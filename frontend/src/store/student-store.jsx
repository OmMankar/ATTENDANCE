import { createContext, useEffect } from "react";
import { useState } from "react";

export const StudentContext = createContext({
  subjects: [],
  absentDates:[],
  StudentDetails: "",
  status: "",
  subjectAndAbsentDate:[],
  handleStatus:()=>{},
  handleStudentDetails:()=>{},
  // handleAbsentDateSubjectCodeWise:()=>{},
  
});

const StudentContextProvider = ({ children }) => {
  let [status, setStatus] = useState("");
  let handleStatus=()=>{
    setStatus("student");
  }
  let [subjectAndAbsentDate,setsubjectAndAbsentDate]=useState([]);
 
  let [subjects,setSubjects]=useState([]);
  let [absentDates,setAbsentDates]=useState([]);
  let [StudentDetails,setStudentDetails]=useState("");

  let handleStudentDetails=(data)=>{
    setSubjects([...data.subjects]);
    setAbsentDates([...data.absent]);
    setStudentDetails(data)
   
  }

  let handleAbsentDateSubjectCodeWise=()=>{
    console.log("handleAbsentDateSubjectCodeWise")
    subjects.map(item=>{
      let data =  fetch(
        `https://attendance-backend-wask.onrender.com/api/v1/teacher/numberOfClasses`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            subjectCode:item,
          }),
        }
      )
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          if (!data.success) {
            alert(data.message);
          } else {
             let classes=data.data;
             classes.map(dates=>{

                let newObject = { SubjectId: item, totalClasses: dates.
                  dateOfAttendance.length };
        console.log(newObject);
        setsubjectAndAbsentDate([...subjectAndAbsentDate,newObject]);
             })

          
           
          }
        });
        
        
        
        
       
        
    })
    
  }
  
  return (
    <StudentContext.Provider
      value={{
        status,
        subjects,
        absentDates,
        StudentDetails,
        handleStatus,
        handleStudentDetails,
        subjectAndAbsentDate,

      }}
    >
      {children}
    </StudentContext.Provider>
  );
};
export default StudentContextProvider;
