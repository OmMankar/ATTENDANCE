import React, { useContext, useEffect, useState } from "react";
import { StudentContext } from "../store/student-store";
import Card from "./Card";

const SubjectCodeWise = () => {
  const { subjects, StudentDetails, absentDates } = useContext(StudentContext);
  const [classesData, setClassesData] = useState({});

  useEffect(() => {
    const fetchClassesData = async () => {
      const data = {};
      for (const subjectCode of subjects) {
        try {
          const response = await fetch(
            `https://attendance-backend-wask.onrender.com/api/v1/teacher/numberOfClasses`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ subjectCode }),
            }
          );
          const result = await response.json();
          if (result.success) {
            data[subjectCode] = result.data;
          } else {
            alert(result.message);
          }
        } catch (error) {
          console.error("Error fetching number of classes:", error);
        }
      }
      setClassesData(data);
    };

    if (subjects.length !== 0) {
      fetchClassesData();
    }
  }, [subjects]);

  return (
    <>
      {subjects.map((subjectCode) => {
        const subjectAttendanceDates = absentDates.filter(
          (absent) => absent.subjectCode === subjectCode
        );

        const totalClasses = classesData[subjectCode]
          ? classesData[subjectCode].reduce(
              (acc, dates) => acc + dates.dateOfAttendance.length,
              0
            )
          : 0;

        return (
          <Card
            key={subjectCode}
            item={StudentDetails}
            subjectAttendanceDates={subjectAttendanceDates}
            subjectId={subjectCode}
            totalClasses={totalClasses}
          />
        );
      })}
    </>
  );
};

export default SubjectCodeWise;



// import { useContext } from "react";
// import { StudentContext } from "../store/student-store";
// import Card from "./Card";

// const SubjectCodeWise=()=>{
//   const {subjects,StudentDetails,absentDates,subjectAndAbsentDate}=useContext(StudentContext);
//   // console.log(subjects.length)
  
//   return<> {subjects.map(async(item) => {
//     //marking absent dates
//     const subjectAttendanceDates = absentDates.filter(
//       (absent) => absent.subjectCode === item
//     );
//    //fecthing number of classes for the subject code
//       let totalClasses=0;
//    await fetch(
//     `http://localhost:5000/api/v1/teacher/numberOfClasses`,
//     {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         subjectCode:item,
//       }),
//     }
//   )
//     .then((res) => {
//       return res.json();
//     })
//     .then((data) => {
//       if (!data.success) {
//         alert(data.message);
//       } else {
//          let classes=data.data;
//          classes.map(dates=>{
//           totalClasses=  dates.dateOfAttendance.length;
//             // let newObject = { SubjectId: item, totalClasses: dates.
//             //   dateOfAttendance.length };
    
//          })

      
       
//       }
//     });
    
    
//     console.log(totalClasses)
    
   
    






//     return <Card key={item} item={StudentDetails} subjectAttendanceDates={subjectAttendanceDates} subjectId={item} /*totalClasses={totalClasses}*/ />;
//   })}
//   </>;

// }
// export default SubjectCodeWise;

// The code you provided includes an asynchronous operation (fetch) within the map method, which is not the best approach. The map method is synchronous and does not handle asynchronous operations well. Instead, you should handle the asynchronous operations outside of the map method and then use the resulting data to render your component.

// Here's an improved approach:

// Use useEffect to fetch the number of classes for each subject.
// Store the fetched data in the component's state.
// // Render the component using the state.
