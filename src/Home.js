import { Box, Button, Stack } from "@mui/material";
import "./FormStyle.css";
import ResetPass from "./ResetPass";
import api from "./api";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import useAuth from "./useAuth";
import { useState, useEffect } from "react";
import UpdatePassword from "./UpdatePassword";

export default function Home({ props }) {
  const token = useAuth();
  const [userInfo, setUserInfo] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      api
        .get("/userInfo")
        .then((res) => {
          setUserInfo(res.data);
        })
        .catch(function (error) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error.response.data.message,
          });
        });
    }
  }, [token]);

  const component = token ? (
    <Box>
      <form
        className="loan-form"
        style={{
          flexDirection: "column",
          backgroundColor: "white",
          width: "49%",
          justifyContent: "center",
          display: "flex",
          alignItems: "center",
          margin: "auto",
        }}
      >
        <h1> SAFCSP </h1>
        <hr></hr>
        <Box sx={{ backgroundColor: " #61dafb", width: "100%" }}>
          <label style={{ color: "black" }}>
            {" "}
            <h3>User Information </h3>{" "}
          </label>
        </Box>
        <h3> ID : {userInfo.id}</h3>
        <h3> Name : {userInfo.name}</h3>
        <h3> Email : {userInfo.email} </h3>

        <Button
          onClick={() => {
            navigate("EditName");
          }}
          variant="contained"
          sx={{ margin: 3 }}
        >
          Edit
        </Button>
        <hr></hr>
        <Button
          onClick={() => {
            localStorage.removeItem("authToken");
            navigate("/logIn");
          }}
          variant="contained"
          sx={{ margin: 3 }}
        >
          logout
        </Button>
      </form>
    </Box>
  ) : (
    <Alert severity="error"> Permissions Check Failed </Alert>
  );

  return component;
}
