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
  const id = localStorage.getItem("user login id");
  const onSubmit = (data) => {
    data.id = id;
    petitions.ChangePasswordUser(data);
  };

  return (
    <Stack direction="row" ml={2} mt={5}>
      <Grid container spacing={2}>
        <Grid item xs={4}></Grid>
        <Grid item xs={4} style={{ textAlign: "center" }}>
          <Card
            style={{ background: "#E8F0F2" }}
            sx={{ minWidth: 275, minHeight: 250 }}
          >
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)}>
                <h1>Cambiar contraseña</h1>
                <Stack direction="row" ml={2}>
                  <TextField
                    required
                    style={{ background: "white" }}
                    {...register("oldpassword")}
                    id="outlined-required"
                    label="Contraseña actual"
                    type="password"
                  />
                </Stack>
                <Stack direction="row" ml={2} mt={2}>
                  <TextField
                    required
                    {...register("newpassword")}
                    style={{ background: "white" }}
                    id="outlined-required"
                    label="Contraseña nueva"
                    type="password"
                  />
                </Stack>
                <Stack direction="row" ml={2} mt={2}>
                  <TextField
                    required
                    {...register("newpasswordretry")}
                    style={{ background: "white" }}
                    id="outlined-required"
                    label="Repetir contraseña nueva"
                    type="password"
                  />
                </Stack>
                <Stack direction="row" ml={2} mt={2}>
                  <Button
                    variant="contained"
                    type="submit"
                    style={{ background: "#39A2DB" }}
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
