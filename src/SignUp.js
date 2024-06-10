import { Box, Button, Stack, TextField } from "@mui/material";
import "./FormStyle.css";
import axios from "axios";
import { useState } from "react";
import api from "./api";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

export default function SignUp() {
  const [showModel, setShowModel] = useState(false);
  const navigate = useNavigate();
  const [loanInput, setLoanInput] = useState({
    fullName: "",
    email: "",
    pass: "",
  });

  function ButtonHandlingT() {
    api
      .post("/register", {
        name: loanInput.fullName,
        email: loanInput.email,
        password: loanInput.pass,
      })
      .then((res) => {
        Swal.fire("Signed up successfully!");
        var subToken = res.data.token.substring(3);
        localStorage.setItem("authToken", subToken);

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

  function ButtonHandlingF() {
    if (showModel) {
      setShowModel(false);
    }
  }

  const isInfo =
    loanInput.email === "" ||
    loanInput.fullName === "" ||
    loanInput.pass === "";

  return (
    <Stack
      onClick={ButtonHandlingF}
      sx={{
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#61dafb",
      }}
    >
      <form
        className="loan-form"
        style={{ flexDirection: "column", backgroundColor: "white" }}
      >
        <h1> SAFCSP </h1>

        <hr></hr>

        <Box sx={{ backgroundColor: " #61dafb", width: "112%" }}>
          <label style={{ color: "black", marginBottom: "20px" }}>
            {" "}
            <h3>SignUp</h3>{" "}
          </label>
        </Box>

        <TextField
          sx={{ margin: "10px" }}
          id="outlined-basic"
          label="Full Name "
          variant="outlined"
          value={loanInput.fullName}
          onChange={(event) => {
            setLoanInput({ ...loanInput, fullName: event.target.value });
          }}
        />

        <TextField
          sx={{ margin: "10px" }}
          id="outlined-basic"
          label="Email "
          variant="outlined"
          value={loanInput.email}
          onChange={(event) => {
            setLoanInput({ ...loanInput, email: event.target.value });
          }}
        />

        <TextField
          sx={{ margin: "10px" }}
          id="outlined-basic"
          label="Password"
          variant="outlined"
          value={loanInput.pass}
          onChange={(event) => {
            setLoanInput({ ...loanInput, pass: event.target.value });
          }}
        />

        <Button
          onClick={() => ButtonHandlingT()}
          variant="contained"
          disabled={isInfo}
          sx={{ margin: "10px" }}
        >
          Submit
        </Button>
      </form>
    </Stack>
  );
}
