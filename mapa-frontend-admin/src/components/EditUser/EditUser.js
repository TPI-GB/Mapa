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
import ArrowCircleDownTwoToneIcon from "@mui/icons-material/ArrowCircleDownTwoTone";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import CheckCircleTwoToneIcon from "@mui/icons-material/CheckCircleTwoTone";
import Swal from "sweetalert2";

export default function EditUser() {
  const { id } = useParams();

  if (localStorage.getItem("user login rol") === "Administrador") {
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
    <Stack direction="row" ml={2} mt={2}>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Button
            variant="contained"
            style={{ background: "#053742" }}
            href="/listusers"
          >
            <KeyboardBackspaceIcon /> Volver
          </Button>
        </Grid>
        <Grid item xs={4} style={{ textAlign: "center" }}>
          <Card style={{ background: "#E8F0F2" }} sx={{ minWidth: 400 }}>
            <CardContent>
              <h1>Nuevo Usuario</h1>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Stack direction="row" ml={2}>
                  <TextField
                    style={{ background: "white" }}
                    required
                    {...register("first_name")}
                    label="Nombre"
                  />
                </Stack>
                <Stack direction="row" ml={2} mt={2}>
                  <TextField
                    style={{ background: "white" }}
                    required
                    {...register("last_name")}
                    label="Apellido"
                  />
                </Stack>
                <Stack direction="row" ml={2} mt={2}>
                  <TextField
                    style={{ background: "white" }}
                    required
                    {...register("nick")}
                    label="Nick"
                  />
                </Stack>
                <Stack direction="row" ml={2} mt={2}>
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
                <Stack direction="row" ml={2} mt={1}>
                  <h6>Rol</h6>
                </Stack>
                <Stack direction="row" ml={2}>
                  <select {...register("rol")}>
                    <option value="Administrador">Administrador</option>
                    <option value="Moderador">Moderador</option>
                  </select>
                </Stack>
                <Stack direction="row" ml={2} mt={8}>
                  <Button
                    variant="contained"
                    type="submit"
                    style={{ background: "#39A2DB" }}
                  >
                    <CheckCircleTwoToneIcon /> Guardar
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
  const { register, handleSubmit } = useForm();

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getData = async () => {
    const response = petitions.GetUserById(id);
    const user = await response;
    setUser(user);
  };

  const onSubmit = (data) => {
    petitions.EditUser(data, id);
  };

  let selected = (
    <select {...register("rol")}>
      <option value="Administrador">Administrador</option>
      <option value="Moderador">Moderador</option>
    </select>
  );

  if (user.rol === "Moderador") {
    selected = (
      <select {...register("rol")}>
        <option value="Moderador">Moderador</option>
        <option value="Administrador">Administrador</option>
      </select>
    );
  }

  return (
    <Stack direction="row" ml={2} mt={2}>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Button
            variant="contained"
            style={{ background: "#053742" }}
            href="/listusers"
          >
            <KeyboardBackspaceIcon /> Volver
          </Button>
        </Grid>
        <Grid item xs={4} style={{ textAlign: "center" }}>
          <Card style={{ background: "#E8F0F2" }} sx={{ minWidth: 400 }}>
            <CardContent>
              <h1>Editar Usuario</h1>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Stack direction="row" ml={2}>
                  <TextField
                    style={{ background: "white" }}
                    {...register("first_name")}
                    label="Nuevo Nombre"
                    placeholder={user.first_name}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Stack>
                <Stack direction="row" ml={2} mt={2}>
                  <TextField
                    style={{ background: "white" }}
                    {...register("last_name")}
                    label="Nuevo Apellido"
                    placeholder={user.last_name}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Stack>
                <Stack direction="row" ml={2} mt={2}>
                  <TextField
                    style={{ background: "white" }}
                    {...register("nick")}
                    label="Nuevo Nick"
                    placeholder={user.nick}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Stack>
                <Stack direction="row" ml={2} mt={2}>
                  <TextField
                    style={{ background: "white" }}
                    {...register("email")}
                    label="Nuevo Email"
                    placeholder={user.email}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Stack>
                <Stack direction="row" ml={2} mt={1}>
                  <h6>Nuevo Rol</h6>
                </Stack>
                <Stack direction="row" ml={2}>
                  {selected}
                </Stack>
                <Stack direction="row" ml={2} mt={9}>
                  <Button
                    type="submit"
                    variant="contained"
                    style={{ background: "#39A2DB" }}
                  >
                    <CheckCircleTwoToneIcon /> Guardar Cambios
                  </Button>
                </Stack>
              </form>
              <Stack direction="row" ml={2} mt={4}>
                {buttonStatus(user)}
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Stack>
  );
}

function buttonStatus(user) {
  let button = (
    <Button
      type="submit"
      variant="contained"
      style={{ background: "#AC0D0D" }}
      onClick={() => unsubscribeUser(user._id)}
    >
      <ArrowCircleDownTwoToneIcon /> DAR DE BAJA
    </Button>
  );
  if (!user.active) {
    button = (
      <Button
        type="submit"
        variant="contained"
        style={{ background: "green" }}
        onClick={() => subscribeUser(user._id)}
      >
        <ArrowCircleUpIcon /> DAR DE ALTA
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
