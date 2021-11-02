import * as React from "react";
import { Box } from "@mui/system";
import {
  TextField,
  Button,
  Stack,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import "./Login.scss";

export default function Login() {
  return (
    <Stack direction="row" ml={2} mt={5}>
      <Grid container spacing={2}>
        <Grid item xs={4}></Grid>
        <Grid item xs={4} style={{ textAlign: "center" }}>
          <Card sx={{ minWidth: 275 }}>
            <CardContent>
              <Box
                component="form"
                sx={{
                  width: 110,
                  height: 250,
                  "&:hover": {
                    opacity: [0.9, 0.8, 0.7],
                  },
                  "& .MuiTextField-root": { m: 2, width: "7cm" },
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
              <Stack direction="row" ml={2}>
                <Button variant="contained" href="/Home">
                  Ingresar
                </Button>
              </Stack>
              <Stack direction="row" ml={2} justifyContent="space-between">
                <Button variant="text" href="/reset">
                  ¿Olvidaste tu contraseña?
                </Button>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Stack>
  );
}
