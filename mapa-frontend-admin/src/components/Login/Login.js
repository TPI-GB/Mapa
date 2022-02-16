import * as React from "react";
import { useHistory } from "react-router-dom";
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
  const history = useHistory();
  const onSubmit = (data) => {
    const res = petitions.LoginUser(data);
    res
      .then((response) => {
        if (response.status === 200) {
          localStorage.setItem("user login token", response.data.token);
          localStorage.setItem("user login expires", response.data.expires);

          localStorage.setItem(
            "user login first_name",
            response.data.first_name
          );
          localStorage.setItem("user login last_name", response.data.last_name);
          localStorage.setItem("user login nick", response.data.nick);
          localStorage.setItem("user login rol", response.data.rol);
          localStorage.setItem("user login email", response.data.email);
          localStorage.setItem("user login id", response.data.id);

          history.push("./listplaces");
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
          <Card style={{ background: "#E8F0F2" }} sx={{ minWidth: 275 }}>
            <CardContent>
              <h1>Login</h1>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Stack direction="row" ml={2}>
                  <TextField
                    style={{ background: "white" }}
                    required
                    {...register("email")}
                    label="Email"
                  />
                </Stack>
                <Stack direction="row" ml={2} mt={2}>
                  <TextField
                    style={{ background: "white" }}
                    required
                    {...register("password")}
                    label="Contraseña"
                    type="password"
                  />
                </Stack>
                <Stack direction="row" ml={2} mt={2}>
                  <Button
                    type="submit"
                    variant="contained"
                    style={{ background: "#053742" }}
                  >
                    Ingresar
                  </Button>
                </Stack>
              </form>
              <Stack
                direction="row"
                ml={2}
                mt={2}
                justifyContent="space-between"
              >
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
