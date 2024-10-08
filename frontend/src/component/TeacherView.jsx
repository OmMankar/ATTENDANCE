import { useContext, useRef, useState } from "react";

import { TeacherContext } from "../store/teacher-store";
import Loading from "./Loading";

const TeacherView=()=>{
  
  const { handleStudentsData}=useContext(TeacherContext);
  const[loading,setLoading]=useState(false);
  let section = useRef("");
  let department = useRef("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    fetch("http://localhost:5000/api/v1/teacher/fetchStudent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        section: section.current.value,
        department:department.current.value
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setLoading(false)
        if (!data.success) {
          alert(data.message);
        } else {
         
          handleStudentsData(data.data);
          alert("Fecthing Students");
        }
      });

  
  };
      

  return <>
  {loading && <Loading></Loading>}
  <center className="container px-4 py-5 " id="featured-3">
        <center className="" style={{ width: "300px" }}>
          <form onSubmit={handleSubmit}>
            <h1 className="h3 fw-normal">Enter Class Details</h1>
            {/* //department */}
            <div className="form-floating" style={{ paddingTop: "10px", paddingBottom: "10px" }}>
              <input
                type="text"
                className="form-control"
                id="floatingInput"
                placeholder="section"
                ref={department}
              />
              <label for="floatingInput">Department</label>
              
            </div>
            {/* section */}
            <div className="form-floating" style={{ paddingTop: "10px", paddingBottom: "10px" }}>
              <input
                type="text"
                className="form-control"
                id="floatingInput"
                placeholder="section"
                ref={section}
              />
              <label for="floatingInput">Section</label>
              
            </div>
           
            <button
              className="btn btn-primary w-100"
              type="submit"
              value="Submit"
            >
              Submit
            </button>
          </form>
         
        </center>
        
      </center>
    
    </>

}
export default TeacherView;
