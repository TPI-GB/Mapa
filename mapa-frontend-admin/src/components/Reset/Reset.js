import * as React from "react";
import { useForm } from "react-hook-form";
import {
  TextField,
  Button,
  Stack,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import "./Reset.scss";
import Typography from "@mui/material/Typography";
import petitions from "../Petitions";
import Swal from "sweetalert2";

export default function Reset() {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    data.numberSecurity = Math.floor(Math.random() * (9999 - 1000 + 1) + 1000);
    petitions.SendEmailReset(data);
    NumberVerify(data);
  };
  return (
    <Stack direction="row" ml={2} mt={5}>
      <Grid container spacing={2}>
        <Grid item xs={4}></Grid>
        <Grid item xs={4} style={{ textAlign: "center" }}>
          <Card sx={{ minWidth: 275 }}>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Ingresá tu correo electrónico para recuperar tu contraseña.
                </Typography>

                <TextField
                  required={true}
                  id="outlined-required"
                  label="Email"
                  defaultValue=""
                  {...register("email")}
                />
                <Stack direction="row" ml={20} mt={2}>
                  <Button
                    type="submit"
                    style={{
                      background: "lightblue",
                      color: "black",
                      textAlign: "center",
                    }}
                  >
                    Enviar
                  </Button>
                </Stack>
              </form>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Stack>
  );
}

function NumberVerify(data) {
  return Swal.fire({
    title: "Info!",
    text: "Ingrese el numero enviado",
    icon: "info",
    confirmButtonText: "Ok",
  });
}
