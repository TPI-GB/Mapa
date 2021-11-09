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

export default function ChangePassword() {
  return (
    <Stack direction="row" ml={2} mt={5}>
      <Grid container spacing={2}>
        <Grid item xs={4}></Grid>
        <Grid item xs={4} style={{ textAlign: "center" }}>
          <Card sx={{ minWidth: 275, minHeight: 550 }}>
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
                <h1>Cambiar contraseña</h1>
                <TextField
                  required
                  id="outlined-required"
                  label="Email"
                  defaultValue=""
                />
                <TextField
                  required
                  id="outlined-required"
                  label="Contraseña vieja"
                  defaultValue=""
                />
                <TextField
                  required
                  id="outlined-required"
                  label="Contraseña nueva"
                  defaultValue=""
                />
                <TextField
                  required
                  id="outlined-required"
                  label="Repetir contraseña"
                  defaultValue=""
                />

                <Stack direction="row" ml={2}>
                  <Button variant="contained" href="/Home">
                    Cambiar
                  </Button>
                </Stack>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Stack>
  );
}
