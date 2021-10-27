import * as React from "react";
import { Box } from "@mui/system";
import { TextField } from "@mui/material";
import "./Login.scss";

export default function Login() {
  return (
    <div className="login">
      <Box
        component="form"
        sx={{
          width: 300,
          height: 300,
          "&:hover": {
            opacity: [0.9, 0.8, 0.7],
          },
          "& .MuiTextField-root": { m: 4, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <h1>Login</h1>
        <TextField
          required
          id="outlined-required"
          label="Email"
          defaultValue=""
        />
        <TextField
          required
          id="outlined-required"
          label="Contraseña"
          defaultValue=""
        />
      </Box>
    </div>
  );
}
