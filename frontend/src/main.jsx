import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import Welcome from "./routes/Welcome.jsx";
import TeacherContextProvider from "./store/teacher-store.jsx";
import Teacher from "./routes/Teacher.jsx";
import Student from "./routes/Student.jsx";
import StudentContextProvider from "./store/student-store.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Welcome /> },
      {
        path: "/student",
        element: (
          <StudentContextProvider>
            <Student />
          </StudentContextProvider>
        ),
      },
      {
        path: "/teacher",
        element: (
          <TeacherContextProvider>
            <Teacher />
          </TeacherContextProvider>
        ),
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
