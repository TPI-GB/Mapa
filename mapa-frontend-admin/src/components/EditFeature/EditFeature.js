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
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import CheckCircleTwoToneIcon from "@mui/icons-material/CheckCircleTwoTone";

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
    <Stack direction="row" ml={2} mt={3}>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Button
            variant="contained"
            style={{ background: "#053742" }}
            href="/listfeatures"
          >
            <KeyboardBackspaceIcon /> Volver
          </Button>
        </Grid>
        <Grid item xs={4} style={{ textAlign: "center" }}>
          <Card style={{ background: "#E8F0F2" }} sx={{ minWidth: 400 }}>
            <CardContent>
              <h1>Nueva Característica</h1>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Stack direction="row" ml={2} mt={4}>
                  <TextField
                    sx={{ minWidth: 370 }}
                    style={{ background: "white" }}
                    required
                    {...register("name")}
                    label="Descripción"
                  />
                </Stack>

                <Stack direction="row" ml={2} mt={6}>
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
    <Stack direction="row" ml={2} mt={3}>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Button
            variant="contained"
            style={{ background: "#053742" }}
            href="/listfeatures"
          >
            <KeyboardBackspaceIcon /> Volver
          </Button>
        </Grid>
        <Grid item xs={4} style={{ textAlign: "center" }}>
          <Card style={{ background: "#E8F0F2" }} sx={{ minWidth: 400 }}>
            <CardContent>
              <h1>Editar Característica</h1>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Stack direction="row" ml={2} mt={4}>
                  <TextField
                    sx={{ minWidth: 370 }}
                    style={{ background: "white" }}
                    {...register("name")}
                    label="Nueva descripción"
                    placeholder={feature.name}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Stack>
                <Stack direction="row" ml={2} mt={6}>
                  <Button
                    type="submit"
                    variant="contained"
                    style={{ background: "#39A2DB" }}
                  >
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
