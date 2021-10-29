import * as React from "react";
import Box from "@mui/material/Box";
import {
  TextField,
  Button,
  Stack,
  Grid,
  Card,
  CardContent,
  Modal,
} from "@mui/material";

export default function Reset() {
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
                  "& .MuiTextField-root": { m: 2, width: "8cm" },
                }}
                noValidate
                autoComplete="off"
              >
                <h4 style={{ textAlign: "justify" }}>
                  Ingresa tu correo electronico para recuperar tu cuenta.
                </h4>

                <TextField
                  required
                  id="outlined-required"
                  label="Email"
                  defaultValue=""
                />
              </Box>

              <Stack direction="row" ml={2}>
                <Button variant="contained">Enviar</Button>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Stack>
  );
}
