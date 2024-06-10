import "./FormStyle.css";
import api from "./api";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import useAuth from "./useAuth";
import { useState, useEffect } from "react";
import { Box, Button, Stack, TextField } from "@mui/material";

export default function UpdatePassword({ props }) {
  const token = useAuth();

  const navigate = useNavigate();
  const [loanInput, setLoanInput] = useState({
    oldPass: "",
    newPass: "",
    newPass2: "",
  });

  const isAble =
    loanInput.oldPass === "" ||
    loanInput.newPass === "" ||
    loanInput.newPass2 === "" ||
    loanInput.newPass2 !== loanInput.newPass;

  function ButtonHandlingT() {
    api
      .post("/changePassword", {
        old_password: loanInput.oldPass,
        new_password: loanInput.newPass,
        new_password_confirmation: loanInput.newPass,
      })
      .then((res) => {
        Swal.fire("Password updated successfully!");

        navigate("/Home");
      })
      .catch(function (error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response.data.message,
        });
      });
  }

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
            <h3>Update Password</h3>{" "}
          </label>
        </Box>
        <TextField
          sx={{ margin: "10px" }}
          id="outlined-basic"
          label="Old Password "
          variant="outlined"
          value={loanInput.oldPass}
          onChange={(event) => {
            setLoanInput({ ...loanInput, oldPass: event.target.value });
          }}
        />

        <TextField
          sx={{ margin: "10px" }}
          id="outlined-basic"
          label="New Password"
          variant="outlined"
          value={loanInput.newPass}
          onChange={(event) => {
            setLoanInput({ ...loanInput, newPass: event.target.value });
          }}
        />

        <TextField
          sx={{ margin: "10px" }}
          id="outlined-basic"
          label="NewPassword Conf "
          variant="outlined"
          value={loanInput.newPass2}
          onChange={(event) => {
            setLoanInput({ ...loanInput, newPass2: event.target.value });
          }}
        />

        <Button
          onClick={() => ButtonHandlingT()}
          variant="contained"
          sx={{ margin: 3 }}
          disabled={isAble}
        >
          Submit
        </Button>
        <hr></hr>
      </form>
    </Box>
  ) : (
    <Alert severity="error"> Permissions Check Failed </Alert>
  );

  return component;
}
