import { Box, Button, Stack } from "@mui/material";
import "./FormStyle.css";
import Model from "./Model";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "./api";
import Swal from "sweetalert2";
import useAuth from "./useAuth";

export default function LoanForm() {
  const [showModel, setShowModel] = useState(false);
   const [loanInput, setLoanInput] = useState({
  
    email: "",
    pass: "",
  });

  const navigate = useNavigate();

  const Token = useAuth();
  function ButtonHandlingT($token) {
    api
      .post("/login", {
        email: loanInput.email,
        password: loanInput.pass,
      })
      .then((res) => {
        
      var subToken= res.data.token.substring(3);
      console.log(subToken);
        localStorage.setItem("authToken", subToken );
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
    loanInput.pass === "" ||
    loanInput.isEmployee === false;

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
          <label style={{ color: "black" }}>
            {" "}
            <h3>Login </h3>{" "}
          </label>
        </Box>
        <label> Email :</label>
        <input
          type="email"
          value={loanInput.email}
          onChange={(event) => {
            setLoanInput({ ...loanInput, email: event.target.value });
          }}
        />

        <label> Password :</label>
        <input
          type="password"
          value={loanInput.pass}
          onChange={(event) => {
            setLoanInput({ ...loanInput, pass: event.target.value });
          }}
        />
        <Stack sx={{ width: "100%", margin: "10px" }}>
          <Link sx={{ marginBottom: "10px" }} to="/ResetPass">
            Forget Password?
          </Link>
          <hr></hr>
          <Link to="/SignUp">Signup?</Link>
        </Stack>

        <Button
          onClick={ButtonHandlingT}
          variant="contained"
          disabled={isInfo}
          sx={{ margin: 3 }}
        >
          Submit
        </Button>
      </form>

      <Model props={showModel} />
    </Stack>
  );
}
