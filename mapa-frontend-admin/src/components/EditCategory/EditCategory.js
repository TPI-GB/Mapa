import { useParams } from "react-router";
import { useForm } from "react-hook-form";
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
              <h1>Editar Categoria</h1>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Stack direction="row" ml={2}>
                  <TextField
                    {...register("name")}
                    label="Nombre De Categoria"
                  />
                </Stack>
                <Stack direction="row" ml={2} mt={2}>
                  <Button type="submit" style={{ background: "black" }}>
                    Cargar Datos
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
