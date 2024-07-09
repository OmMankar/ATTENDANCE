import { useContext, useRef } from "react";
import { StudentContext } from "../store/student-store";


const StudentAuthentication = () => {
const {handleStatus,handleStudentDetails}=useContext(StudentContext);

  let scholarNo = useRef("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    fetch("http://localhost:5000/api/v1/student", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        scholarNo: scholarNo.current.value,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (!data.success) {
          alert(data.message);
        } else {
          
          handleStatus();
          
          handleStudentDetails(data.data)
          alert("Logged In successfully");
        }
      });

    scholarNo.current.value = "";
  };

  return (
    <>
      <center className="container px-4 py-5 " id="featured-3">
        <center className="" style={{ width: "300px" }}>
          <form onSubmit={handleSubmit}>
            <h1 className="h3 fw-normal">Please sign in</h1>

            <div
              className="form-floating"
              style={{ paddingTop: "10px", paddingBottom: "10px" }}
            >
              <input
                type="text"
                className="form-control"
                id="floatingPassword"
                placeholder="Scholar No."
                ref={scholarNo}
              />
              <label for="floatingPassword">Scholar No.</label>
            </div>

            <button
              className="btn btn-primary w-100"
              type="submit"
              value="submit"
            >
              Sign in
            </button>
          </form>

       
        </center>
      </center>
    </>
  );
};
export default StudentAuthentication;
