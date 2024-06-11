import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoanForm from "./LogIn";
import SignUp from "./SignUp";
import ResetPass from "./ResetPass";
import Model from "./Model";
import Home from "./Home";
import UpdatePassword from "./UpdatePassword";
import EditName from "./EditName";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <LoanForm />,
      },
      {
        path: "login",
        element: <LoanForm />,
      },
      {
        path: "SignUp",
        element: <SignUp />,
      },
      {
        path: "ResetPass",
        element: <ResetPass />,
      },
      {
        path: "Model",
        element: <Model />,
      },
      {
        path: "Home",
        element: <Home />,
      },
      {
        path: "UpdatePassword",
        element: <UpdatePassword />,
      },
      {
        path: "Home/EditName",
        element: <EditName />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
