import { useContext, useRef } from "react";
import { TeacherContext } from "../store/teacher-store";

const TeacherAuthentication = () => {
  
  const { handleTeacherDetails,handleSubjectCode}=useContext(TeacherContext);

  let EmailId = useRef("");
  let Password = useRef("");
  let subjectCode = useRef("");
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    const code=subjectCode.current.value;
    fetch("https://attendance-backend-wask.onrender.com/api/v1/teacher", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        emailId: EmailId.current.value,
        subjectCode: subjectCode.current.value,
        password: Password.current.value,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (!data.success) {
          alert(data.message);
        } else {
         
          handleTeacherDetails(data);
         
          handleSubjectCode(code);
          alert("Logged In successfully");
        }
      });

    EmailId.current.value = "";
    Password.current.value = "";
    subjectCode.current.value = "";
  };

  return (
    <>
      <center className="container px-4 py-5 " id="featured-3">
        <center className="" style={{ width: "300px" }}>
          <form onSubmit={handleSubmit}>
            <h1 className="h3 fw-normal">Please sign in</h1>

            <div className="form-floating" style={{ paddingTop: "10px" }}>
              <input
                type="email"
                className="form-control"
               
                placeholder="name@gmail.com"
                ref={EmailId}
              />
              <label for="floatingInput">Email Id</label>
            </div>
            <div className="form-floating" style={{ paddingTop: "10px" }}>
              <input
                type="text"
                className="form-control"
               
                placeholder="CSE/ECE/MECH"
                ref={subjectCode}
              />
              <label for="floatingInput">Subject Code</label>
            </div>
            <div
              className="form-floating"
              style={{ paddingTop: "10px", paddingBottom: "10px" }}
            >
              <input
                type="password"
                className="form-control"
                id="floatingPassword"
                placeholder="Password"
                ref={Password}
              />
              <label for="floatingPassword">Password</label>
            </div>
            <button
              className="btn btn-primary w-100"
              type="submit"
              value="Submit"
            >
              Sign in
            </button>
          </form>
          
        </center>
      </center>
    </>
  );
};
export default TeacherAuthentication;
