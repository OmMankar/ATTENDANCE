import "bootstrap/dist/css/bootstrap.min.css";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
    <center><h1>Attendance Application</h1></center>
     
      <Outlet/>
    
    </>
  );
}

export default App;
