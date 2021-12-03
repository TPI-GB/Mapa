import { useParams } from "react-router";
import { useForm } from "react-hook-form";
import petitions from "../Petitions/Petitions";
import { useEffect, useState, useRef } from "react";
import {
  Button,
  Stack,
  Grid,
  Card,
  CardContent,
  TextField,
  Typography,
  Select,
  MenuItem,
} from "@mui/material";
import CheckCircleTwoToneIcon from "@mui/icons-material/CheckCircleTwoTone";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import "./EditPlace.scss";
import CategorySelect from "./CategorySelect";
import FeatureSelect from "./FeatureSelect";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as Icons from "@fortawesome/free-solid-svg-icons";

export default function EditPlace() {
  const { id } = useParams();

  let form;

  if (id === "new") {
    form = FormNewPlace();
  } else {
    form = FormEditPlace(id);
  }
  return form;
}

function FormNewPlace() {
  const iconList = Object.keys(Icons)
    .filter((key) => key !== "fas" && key !== "prefix")
    .map((icon) => Icons[icon]);

  library.add(...iconList);
  const allIcons = library.definitions.fas;
  const { register, handleSubmit, control } = useForm({});
  const [categories, setCategories] = useState([]);
  const [feature, setfeature] = useState([]);
  const onSubmit = (data) => {
    console.log(allIcons);
    data.categories = categories;
    data.features = feature;
    petitions.CreatePlace(data);
  };

  const inputFileRef = useRef();

  return (
    <Stack direction="row" ml={2} mt={3}>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Button
            variant="contained"
            style={{ background: "#053742" }}
            href="/listplaces"
          >
            <KeyboardBackspaceIcon /> Volver
          </Button>
        </Grid>
        <Grid item xs={4} style={{ textAlign: "center" }}>
          <Card style={{ background: "#E8F0F2" }} sx={{ minWidth: 400 }}>
            <CardContent>
              <h1>Nuevo Lugar</h1>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Stack direction="row" ml={2}>
                  <TextField
                    style={{ background: "white" }}
                    required
                    {...register("name")}
                    label="Nombre"
                  />
                </Stack>
                <Stack direction="row" ml={2} mt={2}>
                  <TextField
                    style={{ background: "white" }}
                    required
                    {...register("address")}
                    label="Dirección"
                  />
                </Stack>
                <Stack direction="row" ml={2} mt={2}>
                  <TextField
                    style={{ background: "white" }}
                    required
                    {...register("lactitude")}
                    label="Latitud"
                  />
                </Stack>
                <Stack direction="row" ml={2} mt={2}>
                  <TextField
                    style={{ background: "white" }}
                    required
                    {...register("longitude")}
                    label="Longitud"
                  />
                </Stack>
                <Stack direction="row" ml={2} mt={2}>
                  <TextField
                    style={{
                      background: "white",
                      width: "100%",
                    }}
                    {...register("description")}
                    label="Descripcion"
                  />
                </Stack>
                <Stack direction="row" ml={2} mt={2}>
                  <CategorySelect
                    control={control}
                    onChangeProp={(e) => {
                      console.log(e);
                      setCategories([...categories, e.target.innerText]);
                    }}
                  />
                </Stack>
                <Stack direction="row" ml={2} mt={2}>
                  <FeatureSelect
                    control={control}
                    onChangeProp={(e) => {
                      console.log(e);
                      setfeature([...feature, e.target.innerText]);
                    }}
                  />
                </Stack>

                <Stack direction="row" ml={2} mt={2}>
                  <Typography align="inherit" mt={0.3} variant="button">
                    {"Cargar imagen"}
                  </Typography>

                  <input type="file" ref={inputFileRef} />
                </Stack>
                <Stack direction="row" ml={2}>
                  Icono
                </Stack>
                <Stack direction="row" ml={2}>
                  <Select>
                    <MenuItem value="icono">
                      <FontAwesomeIcon icon={"coffee"} />
                    </MenuItem>
                  </Select>
                </Stack>
                <Stack direction="row" ml={2} mt={2}>
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

function FormEditPlace(id) {
  const [place, setPlace] = useState([]);
  const [categories, setCategories] = useState([]);
  const [feature, setfeature] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const responsePlace = petitions.GetPlaceById(id);
    const place = await responsePlace;
    setPlace(place);
  };

  const { register, handleSubmit, control } = useForm();
  const onSubmit = (data) => {
    data.categories = categories;
    data.features = feature;
    petitions.EditPlace(data, id);
  };

  const inputFileRef = useRef();

  return (
    <Stack direction="row" ml={2} mt={3}>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Button
            variant="contained"
            style={{ background: "#053742" }}
            href="/listplaces"
          >
            <KeyboardBackspaceIcon /> Volver
          </Button>
        </Grid>
        <Grid item xs={4} style={{ textAlign: "center" }}>
          <Card style={{ background: "#E8F0F2" }} sx={{ minWidth: 400 }}>
            <CardContent>
              <h1>Editar Lugar</h1>

              <form onSubmit={handleSubmit(onSubmit)}>
                <Stack direction="row" ml={2}>
                  <TextField
                    style={{ background: "white" }}
                    {...register("name")}
                    label="Nuevo Nombre"
                    placeholder={place.name}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Stack>
                <Stack direction="row" ml={2} mt={2}>
                  <TextField
                    style={{ background: "white" }}
                    {...register("address")}
                    label="Nueva Dirección"
                    placeholder={place.address}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Stack>
                <Stack direction="row" ml={2} mt={2}>
                  <TextField
                    style={{ background: "white" }}
                    {...register("lactitude")}
                    label="Nueva Latitud"
                    placeholder={place.lactitude}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Stack>
                <Stack direction="row" ml={2} mt={2}>
                  <TextField
                    style={{ background: "white" }}
                    {...register("longitude")}
                    label="Nueva Longitud"
                    placeholder={place.longitude}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Stack>
                <Stack direction="row" ml={2} mt={2}>
                  <TextField
                    style={{ background: "white", width: "100%" }}
                    {...register("description")}
                    label="Nueva Descripcion"
                    placeholder={place.description}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Stack>

                <Stack direction="row" ml={2} mt={2}>
                  <CategorySelect
                    control={control}
                    onChangeProp={(e) => {
                      console.log(e);
                      setCategories([...categories, e.target.innerText]);
                    }}
                    placeholder={place.longitude}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Stack>
                <Stack direction="row" ml={2} mt={2}>
                  <FeatureSelect
                    control={control}
                    onChangeProp={(e) => {
                      console.log(e);
                      setfeature([...feature, e.target.innerText]);
                    }}
                    placeholder={place.longitude}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Stack>
                <Stack direction="row" ml={2} mt={2}>
                  <Typography align="inherit" mt={0.3} variant="button">
                    {"Cargar imagen"}
                  </Typography>

                  <input
                    type="file"
                    ref={inputFileRef}
                    placeholder={place.longitude}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Stack>
                <Stack direction="row" ml={2} mt={2}>
                  <Button
                    type="submit"
                    variant="contained"
                    type="submit"
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
