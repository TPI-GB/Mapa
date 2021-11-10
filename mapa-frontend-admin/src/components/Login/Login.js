import * as React from "react";
import { useForm } from "react-hook-form";
import petitions from "../Petitions";
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
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    const res = petitions.LoginUser(data);
    res
      .then((response) => {
        if (response.status === 200) {
          console.log(res);
          console.log("Guardar token en local storage");
          console.log("Ir a Home");
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
              <h1>Login</h1>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Stack direction="row" ml={2}>
                  <TextField required {...register("email")} label="Email" />
                  <Stack direction="row" ml={2} />
                </Stack>
                <Stack direction="row" ml={2}>
                  <TextField
                    required
                    {...register("password")}
                    label="Contraseña"
                  />
                </Stack>
                <Stack direction="row" ml={2}>
                  <Button type="submit" style={{ background: "blue" }}>
                    Ingresar
                  </Button>
                </Stack>
              </form>
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
