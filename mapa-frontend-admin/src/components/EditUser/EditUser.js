import { useParams } from "react-router";
import { useForm } from "react-hook-form";
import petitions from "../Petitions";
import { useEffect, useState } from "react";
import {
  Button,
  Stack,
  Grid,
  Card,
  CardContent,
  TextField,
} from "@mui/material";
import Swal from "sweetalert2";

export default function EditUser() {
  const { id } = useParams();

  if (sessionStorage.getItem("user login rol") === "Administrador") {
    let form;

    if (id === "new") {
      form = FormNewUser();
    } else {
      form = FormEditUser(id);
    }
    return form;
  } else {
    Swal.fire({
      title: "Error!",
      text: "No tiene los permisos para acceder a esta pagina",
      icon: "error",
      confirmButtonText: "Ok",
    });
    return null;
  }
}

function FormNewUser() {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => petitions.RegisterUser(data);

  return (
    <Stack direction="row" ml={2} mt={5}>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Button style={{ background: "lightblue" }} href="/listusers">
            Volver
          </Button>
        </Grid>
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
                <Stack direction="row" ml={2} mt={2}>
                  <h6>Rol</h6>
                </Stack>
                <Stack direction="row" ml={2}>
                  <select {...register("rol")}>
                    <option value="Administrador">Administrador</option>
                    <option value="Ingresador de datos">
                      Ingresador de datos
                    </option>
                  </select>
                </Stack>
                <Stack direction="row" ml={2} mt={2}>
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
  const [user, setUser] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const response = petitions.GetUserById(id);
    const user = await response;
    setUser(user);
  };

  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => petitions.EditUser(data, id);

  return (
    <Stack direction="row" ml={2} mt={5}>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Button style={{ background: "lightblue" }} href="/listusers">
            Volver
          </Button>
        </Grid>
        <Grid item xs={4} style={{ textAlign: "center" }}>
          <Card sx={{ minWidth: 400 }}>
            <CardContent>
              <h1>Editar Usuario</h1>
              <h4>Editando: </h4>
              <h6>
                <b>Nombre:</b> {user.first_name}
              </h6>
              <h6>
                <b>Apellido:</b> {user.last_name}
              </h6>
              <h6>
                <b>Nick:</b> {user.nick}
              </h6>
              <h6>
                <b>Email:</b> {user.email}
              </h6>
              <h6>
                <b>Estado:</b> {getStatus(user)}
              </h6>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Stack direction="row" ml={2}>
                  <TextField {...register("first_name")} label="Nuevo Nombre" />
                  <Stack direction="row" ml={2} />
                </Stack>
                <Stack direction="row" ml={2}>
                  <TextField
                    {...register("last_name")}
                    label="Nuevo Apellido"
                  />
                </Stack>
                <Stack direction="row" ml={2}>
                  <TextField {...register("nick")} label="Nuevo Nick" />
                </Stack>
                <Stack direction="row" ml={2}>
                  <TextField {...register("email")} label="Nuevo Email" />
                </Stack>
                <Stack direction="row" ml={2}>
                  <TextField
                    {...register("password")}
                    label="Nueva Contraseña"
                    type="password"
                  />
                </Stack>
                <Stack direction="row" ml={2} mt={2}>
                  <h6>Nuevo Rol</h6>
                </Stack>
                <Stack direction="row" ml={2}>
                  <select {...register("rol")}>
                    <option value="Administrador">Administrador</option>
                    <option value="Moderador">Moderador</option>
                  </select>
                </Stack>
                <Stack direction="row" ml={2} mt={2}>
                  <Button type="submit" style={{ background: "black" }}>
                    Guardar Cambios
                  </Button>
                  {buttonStatus(user)}
                </Stack>
              </form>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Stack>
  );
}

function getStatus(user) {
  let userStatus = <b style={{ color: "green" }}>Activo</b>;
  if (!user.active) {
    userStatus = <b style={{ color: "red" }}>Inactivo</b>;
  }
  return userStatus;
}

function buttonStatus(user) {
  let button = (
    <Button
      type="submit"
      style={{ background: "red" }}
      onClick={() => unsubscribeUser(user._id)}
    >
      DAR DE BAJA
    </Button>
  );
  if (!user.active) {
    button = (
      <Button
        type="submit"
        style={{ background: "green" }}
        onClick={() => subscribeUser(user._id)}
      >
        DAR DE ALTA
      </Button>
    );
  }
  return button;
}

function unsubscribeUser(id) {
  return Swal.fire({
    title: "Atencion!",
    text: "Esta a punto de dar de baja un usuario. Esto implica que el mismo ya no podra ingresar al sitio. Sin embargo puede volver a darse de alta.",
    icon: "warning",
    showCancelButton: true,
    cancelButtonColor: "blue",
    cancelButtonText: "Cancelar",
    confirmButtonColor: "red",
    confirmButtonText: "Confirmar",
  }).then((result) => {
    if (result.isConfirmed) {
      const data = false;
      petitions.EditUserStatus(data, id);
    }
  });
}

function subscribeUser(id) {
  return Swal.fire({
    title: "Atencion!",
    text: "Esta a punto de dar de alta un usuario. Esto implica que el mismo ya podra volver a ingresar al sitio. Puede volver a darse de baja.",
    icon: "warning",
    showCancelButton: true,
    cancelButtonColor: "blue",
    cancelButtonText: "Cancelar",
    confirmButtonColor: "green",
    confirmButtonText: "Confirmar",
  }).then((result) => {
    if (result.isConfirmed) {
      const data = true;
      petitions.EditUserStatus(data, id);
    }
  });
}
