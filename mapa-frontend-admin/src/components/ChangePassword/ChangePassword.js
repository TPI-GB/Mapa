import * as React from "react";
import { useForm } from "react-hook-form";
import petitions from "../Petitions/Petitions";
import {
  TextField,
  Button,
  Stack,
  Grid,
  Card,
  CardContent,
} from "@mui/material";

export default function ChangePassword() {
  const { register, handleSubmit } = useForm();
  const id = sessionStorage.getItem("user login id");
  const onSubmit = (data) => {
    data.id = id;
    petitions.ChangePasswordUser(data);
  };

  return (
    <Stack direction="row" ml={2} mt={5}>
      <Grid container spacing={2}>
        <Grid item xs={4}></Grid>
        <Grid item xs={4} style={{ textAlign: "center" }}>
          <Card sx={{ minWidth: 275, minHeight: 550 }}>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)}>
                <h1>Cambiar contraseña</h1>
                <Stack direction="row" ml={2}>
                  <TextField
                    required
                    {...register("oldpassword")}
                    id="outlined-required"
                    label="Contraseña actual"
                    type="password"
                  />
                </Stack>
                <Stack direction="row" ml={2}>
                  <TextField
                    required
                    {...register("newpassword")}
                    id="outlined-required"
                    label="Contraseña nueva"
                    type="password"
                  />
                </Stack>
                <Stack direction="row" ml={2}>
                  <TextField
                    required
                    {...register("newpasswordretry")}
                    id="outlined-required"
                    label="Repetir contraseña nueva"
                    type="password"
                  />
                </Stack>
                <Stack direction="row" ml={2}>
                  <Button
                    type="submit"
                    style={{ background: "lightblue", color: "black" }}
                  >
                    Actualizar contraseña
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
