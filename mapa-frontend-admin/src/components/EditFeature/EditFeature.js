import { useParams } from "react-router";
import { useForm } from "react-hook-form";
import petitions from "../Petitions/Petitions";
import { useEffect, useState } from "react";
import {
  Button,
  Stack,
  Grid,
  Card,
  CardContent,
  TextField,
} from "@mui/material";

export default function EditFeature() {
  const { id } = useParams();

  let form;

  if (id === "new") {
    form = FormNewFeature();
  } else {
    form = FormEditFeature(id);
  }
  return form;
}

function FormNewFeature() {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => petitions.CreateFeature(data);

  return (
    <Stack direction="row" ml={2} mt={5}>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Button style={{ background: "lightblue" }} href="/listfeatures">
            Volver
          </Button>
        </Grid>
        <Grid item xs={4} style={{ textAlign: "center" }}>
          <Card sx={{ minWidth: 400 }}>
            <CardContent>
              <h1>Cargar Característica</h1>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Stack direction="row" ml={2}>
                  <TextField required {...register("name")} label="Descripción" />
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

function FormEditFeature(id) {
  const [feature, setFeature] = useState([]);

  useEffect(() => {
    getData();
  });

  const getData = async () => {
    const response = petitions.GetFeatureById(id);
    const feature = await response;
    setFeature(feature);
  };

  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => petitions.EditFeature(data, id);

  return (
    <Stack direction="row" ml={2} mt={5}>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Button style={{ background: "lightblue" }} href="/listfeatures">
            Volver
          </Button>
        </Grid>
        <Grid item xs={4} style={{ textAlign: "center" }}>
          <Card sx={{ minWidth: 400 }}>
            <CardContent>
              <h1>Editar Característica</h1>
              <h4>Editando: </h4>
              <h6>
                <b>Nombre:</b> {feature.name}
              </h6>
              
              <form onSubmit={handleSubmit(onSubmit)}>
                <Stack direction="row" ml={2}>
                  <TextField {...register("name")} label="Nueva descripción" />
                  <Stack direction="row" ml={2} />
                </Stack>
                
                <Stack direction="row" ml={2} mt={2}>
                  <Button type="submit" style={{ background: "black" }}>
                    Guardar Cambios
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
