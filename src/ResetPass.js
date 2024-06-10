import { Box, Button, Stack, TextField } from "@mui/material";
import "./FormStyle.css";
import Model from "./Model";
import { useState } from "react";
import api from "./api";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function ResetPass() {
  const [showModel, setShowModel] = useState(false);
  const [loanInput, setLoanInput] = useState({
    email: "",
  });

  function ButtonHandlingT() {
    api
      .post("/password/reset", {
        email: loanInput.email,
      })
      .then((result) => {
        api
          .post("/password/emile", {
            email: loanInput.email,
          })
          .catch((error) => {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: error.response.data.message,
            });
          });
      })
      .catch((error) => {
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

  const isInfo = loanInput.email === "";
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
            <h3>Reset Password </h3>{" "}
          </label>
        </Box>

        <TextField
          sx={{ margin: "10px" }}
          id="outlined-basic"
          label="email"
          variant="outlined"
          value={loanInput.email}
          onChange={(event) => {
            setLoanInput({ ...loanInput, email: event.target.value });
          }}
        />

        <Button
          onClick={() => ButtonHandlingT()}
          variant="contained"
          disabled={isInfo}
          sx="margin: 10px"
        >
          {" "}
          Submit
        </Button>
      </form>

      <Model props={showModel} />
    </Stack>
  );
}
