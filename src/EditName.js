import "./FormStyle.css";
import api from "./api";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import useAuth from "./useAuth";
import { useState, useEffect } from "react";
import { Box, Button, Stack, TextField } from "@mui/material";

export default function EditName({ props }) {
  const token = useAuth();

  const navigate = useNavigate();
  const [loanInput, setLoanInput] = useState({
    oldPass: "",
    newPass: "",
  });

  function ButtonHandlingT() {
    api
      .post("/updateInfo", {
        email: loanInput.oldPass,
        name: loanInput.newPass,
      })
      .then((res) => {
        Swal.fire("Information updated successfully!");

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
            <h3>Update Information</h3>{" "}
          </label>
        </Box>
        <TextField
          sx={{ margin: "10px" }}
          id="outlined-basic"
          label="New Email"
          variant="outlined"
          value={loanInput.oldPass}
          onChange={(event) => {
            setLoanInput({ ...loanInput, oldPass: event.target.value });
          }}
        />
        <TextField
          sx={{ margin: "10px" }}
          id="outlined-basic"
          label="New Name"
          variant="outlined"
          value={loanInput.newPass}
          onChange={(event) => {
            setLoanInput({ ...loanInput, newPass: event.target.value });
          }}
        />
        <Button
          onClick={() => ButtonHandlingT()}
          variant="contained"
          sx={{ margin: 3 }}
        >
          Submit
        </Button>{" "}
        <hr></hr>
        <Button
          onClick={() => {
            navigate("/UpdatePassword");
          }}
          variant="contained"
          sx={{ margin: 3 }}
        >
          Edit PASSWORD
        </Button>
      </form>
    </Box>
  ) : (
    <Alert severity="error"> Permissions Check Failed </Alert>
  );

  return component;
}
