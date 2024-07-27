import { useContext, useState } from "react";
import { TeacherContext } from "../store/teacher-store";

const Card = ({ item, subjectAttendanceDates, subjectId,totalClasses }) => {
  const { subjectCode, status } = useContext(TeacherContext);

  const [clickStatus, setClickStatus] = useState("");
  const handleAbsent = () => {
    fetch(`https://attendance-backend-wask.onrender.com/api/v1/teacher/fetchStudent/${item._id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        subjectCode,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (!data.success) {
          alert(data.message);
        }
      });
  };

  return (
    <>
      <div className="row">
        <div
          className={`col-sm-6 `}
          style={{ marginLeft: "10%", width: "80%", paddingBottom: "20px" }}
        >
          <div
            className="card "
            style={
              clickStatus === "present"
                ? { borderTop: "5px solid green" }
                : clickStatus === "absent"
                ? { borderTop: "5px solid red" }
                : {}
            }
          >
            <div className={`card-body `}>
              <h5 className="card-title">
                {" "}
                {item.name} <i>{item.scholarNumber}</i>
              </h5>
              <hr />
              {status == "teacher" && <h6>Subject code : {subjectCode}</h6>}
              {status !== "teacher" && <h6>Subject code : {subjectId}</h6>}

             {status !== "teacher" && ( (totalClasses!=0 &&
                <p className="card-text" style={{color:'green',font:"message-box"}}>
                  
                   Percentage attendance : {(totalClasses-(subjectAttendanceDates.length))/totalClasses*100}%
                   </p>)
                   || (totalClasses==0 &&
                    <p className="card-text" style={{color:'green',font:"message-box"}}>
                      
                       Percentage attendance : 100%
                       </p>)
              )}
              {status !== "teacher" && <h6>Dates</h6>}

              {status !== "teacher" && (
                <p className="card-text">
                  {" "}
                  Absent Dates:{" "}
                  {subjectAttendanceDates.length != 0 &&
                    subjectAttendanceDates.map((data) => `${data.date} ,`)}
                  {subjectAttendanceDates.length == 0 &&
                    `Present in all the Classes`}
                </p>
              )}
              {status == "teacher" && clickStatus === "" && (
                <button
                  type="button"
                  className="btn btn-success"
                  style={{ margin: "0 10px" }}
                  onClick={() => {
                    setClickStatus("present");
                  }}
                >
                  Present
                </button>
              )}
              {status === "teacher" && clickStatus === "" && (
                <button
                  type="button"
                  className="btn btn-danger"
                  style={{ margin: "0 10px" }}
                  onClick={() => {
                    setClickStatus("absent");
                    handleAbsent();
                  }}
                >
                  Absent
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Card;
