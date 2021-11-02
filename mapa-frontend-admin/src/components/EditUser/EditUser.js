import { useParams } from "react-router";
import { useForm } from "react-hook-form";
import {
  Button,
  Stack,
  Grid,
  Card,
  CardContent,
  TextField,
  Box,
} from "@mui/material";

export default function EditUser() {
  const { id } = useParams();

  let form;

  if (id === "new") {
    form = FormNewUser();
  } else {
    form = FormEditUser(id);
  }
  return form;
}

function FormNewUser() {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => console.log(data);

  return (
    <Stack direction="row" ml={2} mt={5}>
      <Grid container spacing={2}>
        <Grid item xs={4}></Grid>
        <Grid item xs={4} style={{ textAlign: "center" }}>
          <Card sx={{ minWidth: 400 }}>
            <CardContent>
              <Box
                component="form"
                sx={{
                  width: 400,
                  height: 750,
                  "&:hover": {
                    opacity: [0.9, 0.8, 0.7],
                  },
                  "& .MuiTextField-root": { m: 2, width: "7cm" },
                }}
                noValidate
                autoComplete="off"
              >
                <h1>Crear Usuario</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Stack direction="row" ml={2}>
                    <TextField
                      required
                      {...register("first_name")}
                      label="Nombre"
                    />
                  </Stack>
                  <Stack direction="row" ml={2}>
                    <TextField
                      required
                      {...register("last_name")}
                      label="Apellido"
                    />
                  </Stack>
                  <Stack direction="row" ml={2}>
                    <TextField required {...register("nick")} label="Nick" />
                  </Stack>
                  <Stack direction="row" ml={2}>
                    <TextField
                      required
                      {...register("password")}
                      label="Contraseña"
                      type="password"
                    />
                  </Stack>
                  <Stack direction="row" ml={2}>
                    <h5>Rol</h5>
                    <select {...register("rol")}>
                      <option value="female">Administrador</option>
                      <option value="male">Ingresador de datos</option>
                    </select>
                  </Stack>
                  <Stack direction="row" ml={2}>
                    <Button type="submit" style={{ background: "black" }}>
                      Crear Usuario
                    </Button>
                  </Stack>
                </form>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Stack>
  );
}

function FormEditUser() {
  return "nada";
}
