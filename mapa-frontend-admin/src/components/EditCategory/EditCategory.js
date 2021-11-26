import { useParams } from "react-router";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import {
  Button,
  Stack,
  Grid,
  Card,
  CardContent,
  TextField,
} from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import CheckCircleTwoToneIcon from '@mui/icons-material/CheckCircleTwoTone';
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
    <Stack direction="row" ml={2} mt={3}>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Button variant="contained" style={{ background: "#053742" }} href="/listcategories">
          <KeyboardBackspaceIcon /> Volver
          </Button>
        </Grid>
        <Grid item xs={4} style={{ textAlign: "center" }}>
          <Card style={{ background: "#E8F0F2" }} sx={{ minWidth: 400 }}>
            <CardContent>
              <h1>Nueva Categoría</h1>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Stack direction="row" ml={2} mt={4}>
                  <TextField
                    style={{ background: "white" }}
                    required
                    {...register("name")}
                    label="Nombre De Categoría"
                  />
                </Stack>
                <Stack direction="row" ml={2} mt={6}>
                  <Button variant="contained" type="submit" style={{ background: "#39A2DB" }}>
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

function FormEditCategory(id) {
  const [category, setCategory] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const response = petitions.GetCategoryById(id);
    const category = await response;
    setCategory(category);
  };
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => petitions.EditCategory(data, id);

  return (
    <Stack direction="row" ml={2} mt={3}>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Button variant="contained" style={{ background: "#053742" }} href="/listcategories">
          <KeyboardBackspaceIcon />  Volver
          </Button>
        </Grid>
        <Grid item xs={4} style={{ textAlign: "center" }}>
          <Card style={{ background: "#E8F0F2" }} sx={{ minWidth: 400 }}>
            <CardContent>
              <h1>Editar Categoria</h1>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Stack direction="row" ml={2} mt={4}>
                  <TextField
                    style={{ background: "white" }}
                    {...register("name")}
                    label="Nuevo Nombre De Categoria"
                    placeholder={category.name}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Stack>
                <Stack direction="row" ml={2} mt={6}>
                  <Button type="submit" variant="contained" type="submit" style={{ background: "#39A2DB" }}>
                  <CheckCircleTwoToneIcon /> Guardar Cambios 
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
