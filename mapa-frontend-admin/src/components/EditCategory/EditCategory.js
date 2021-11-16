import { useParams } from "react-router";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import {
  Button,
  Stack,
  Grid,
  Card,
  CardContent,
  TextField,
} from "@mui/material";
import "./EditCategory.scss";
import petitions from "../Petitions/Petitions";

export default function EditCategory() {
  const { id } = useParams();

  let form;

  if (id === "new") {
    form = FormNewCategory();
  } else {
    form = FormEditCategory(id);
  }
  return form;
}

function FormNewCategory() {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => petitions.CreateCategory(data);

  const infoCategory = () => {
    Swal.fire({
      title: "Informacion de categoria padre",
      text: "Si se define una categoria padre, la creada se tomara como sub-categoria de la misma. Si no se selecciona ninguna, sera una categoria principal",
      icon: "info",
      confirmButtonText: "Entendido",
    });
  };

  return (
    <Stack direction="row" ml={2} mt={5}>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Button style={{ background: "lightblue" }} href="/listcategories">
            Volver
          </Button>
        </Grid>
        <Grid item xs={4} style={{ textAlign: "center" }}>
          <Card sx={{ minWidth: 400 }}>
            <CardContent>
              <h1>Cargar Categoria</h1>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Stack direction="row" ml={2}>
                  <TextField
                    required
                    {...register("name")}
                    label="Nombre De Categoria"
                  />
                </Stack>
                <Stack direction="row" ml={2} mt={2}>
                  <h6>Categoria Padre</h6>
                </Stack>
                <Stack direction="row" ml={2}>
                  <select {...register("parent")}></select>
                  <Button
                    onClick={() => infoCategory()}
                    style={{ background: "lightblue" }}
                  >
                    INFO
                  </Button>
                </Stack>
                <Stack direction="row" ml={2} mt={2}>
                  <Button type="submit" style={{ background: "black" }}>
                    Crear categoria
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

function FormEditCategory(id) {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => petitions.EditCategory(data, id);

  const infoCategory = () => {
    Swal.fire({
      title: "Informacion de categoria padre",
      text: "Si se define una categoria padre, la creada se tomara como sub-categoria de la misma. Si no se selecciona ninguna, sera una categoria principal",
      icon: "info",
      confirmButtonText: "Entendido",
    });
  };

  return (
    <Stack direction="row" ml={2} mt={5}>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Button style={{ background: "lightblue" }} href="/listcategories">
            Volver
          </Button>
        </Grid>
        <Grid item xs={4} style={{ textAlign: "center" }}>
          <Card sx={{ minWidth: 400 }}>
            <CardContent>
              <h1>Cargar Categoria</h1>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Stack direction="row" ml={2}>
                  <TextField
                    {...register("name")}
                    label="Nombre De Categoria"
                  />
                </Stack>
                <Stack direction="row" ml={2} mt={2}>
                  <h6>Categoria Padre</h6>
                </Stack>
                <Stack direction="row" ml={2}>
                  <select {...register("parent")}></select>
                  <Button
                    onClick={() => infoCategory()}
                    style={{ background: "lightblue" }}
                  >
                    INFO
                  </Button>
                </Stack>
                <Stack direction="row" ml={2} mt={2}>
                  <Button type="submit" style={{ background: "black" }}>
                    Crear categoria
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
