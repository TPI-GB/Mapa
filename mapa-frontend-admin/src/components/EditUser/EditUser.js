import { useParams } from "react-router";
import { useForm } from "react-hook-form";
import petitions from "../Petitions";
import {
  Button,
  Stack,
  Grid,
  Card,
  CardContent,
  TextField,
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
  const onSubmit = (data) => petitions.RegisterUser(data);

  return (
    <Stack direction="row" ml={2} mt={5}>
      <Grid container spacing={2}>
        <Grid item xs={4}></Grid>
        <Grid item xs={4} style={{ textAlign: "center" }}>
          <Card sx={{ minWidth: 400 }}>
            <CardContent>
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
                  <TextField required {...register("email")} label="Email" />
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
                    <option value="Administrador">Administrador</option>
                    <option value="Ingresador de datos">
                      Ingresador de datos
                    </option>
                  </select>
                </Stack>
                <Stack direction="row" ml={2}>
                  <Button type="submit" style={{ background: "black" }}>
                    Cargar
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

function FormEditUser(id) {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => petitions.EditUser(data, id);

  return (
    <Stack direction="row" ml={2} mt={5}>
      <Grid container spacing={2}>
        <Grid item xs={4}></Grid>
        <Grid item xs={4} style={{ textAlign: "center" }}>
          <Card sx={{ minWidth: 400 }}>
            <CardContent>
              <h1>Editar Usuario</h1>
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
                  <TextField required {...register("email")} label="Email" />
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
                    <option value="Administrador">Administrador</option>
                    <option value="Ingresador de datos">
                      Ingresador de datos
                    </option>
                  </select>
                </Stack>
                <Stack direction="row" ml={2}>
                  <Button type="submit" style={{ background: "black" }}>
                    Guardar Cambios
                  </Button>
                  <Button type="submit" style={{ background: "red" }}>
                    DAR DE BAJA
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
