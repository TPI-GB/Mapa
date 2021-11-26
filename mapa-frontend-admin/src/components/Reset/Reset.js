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
    const res = petitions.SendEmailReset(data);
    res
      .then((response) => {
        if (response.status === 200) {
          NumberVerify(data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
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

async function NumberVerify(data) {
  const { email, numberSecurity } = data;
  const changePassword = (newData) => petitions.ChangePassword(newData);
  return Swal.fire({
    title: "Ingrese el codigo de seguridad enviado a la casilla de coreo",
    input: "text",
    showCancelButton: true,
    confirmButtonText: "Ingresar",
    cancelButtonText: "Salir",
  }).then((result) => {
    if (result.value) {
      if (result.value === `${numberSecurity}`) {
        const newPassword = Math.floor(
          Math.random() * (99999999 - 10000000 + 1) + 10000000
        );
        const newData = {};
        newData.email = email;
        newData.password = newPassword;
        newData.numberSecurity = `${numberSecurity}`;
        changePassword(newData);
      } else {
        Swal.fire({
          title: "Error!",
          text: "El codigo es incorrecto",
          icon: "error",
          confirmButtonText: "Cerrar",
        });
      }
    }
  });
}
