import React from "react";
import { useParams } from "react-router";
import { useForm } from "react-hook-form";
import petitions from "../Petitions/Petitions";
import { useEffect, useState, useRef } from "react";
import {
  Button,
  Stack,
  Modal,
  Box,
  Grid,
  Card,
  CardContent,
  TextField,
  Typography,
  Select,
  MenuItem,
  Link,
} from "@mui/material";
import CheckCircleTwoToneIcon from "@mui/icons-material/CheckCircleTwoTone";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import "./EditPlace.scss";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as Icons from "@fortawesome/free-solid-svg-icons";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

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

  const { register, handleSubmit } = useForm();
  const [categories, setCategories] = useState([]);
  const [feature, setFeature] = useState([]);
  const [features, setFeatures] = useState([]);
  const [files, setFiles] = useState([]);

  const onSubmit = async (data) => {
    let fileName = await sendHandler();
    data.images = fileName;
    data.categories = categories;
    data.features = features;
    petitions.CreatePlace(data);
  };

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setFeature(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const responseCategories = petitions.GetCategories();
    const categories = await responseCategories;
    setCategories(categories);
    const featureValues = await petitions.GetFeatures();
    setFeatures(featureValues.map((x) => x.name));
  };

  const selectedHandler = (e) => {
    setFiles(e.target.files);
  };

  const sendHandler = async () => {
    let arrayImages = [];
    for (var i = 0; i < files.length; i++) {
      const response = await petitions.SaveImageAndGetName(files[i]);
      arrayImages.push(response);
    }
    return arrayImages;
  };

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
                  {ModalTutorial()}
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
                <Stack ml={2} mt={2}>
                  <p>
                    <b>Seleccione categoria</b>
                  </p>
                  <Select
                    {...register("category")}
                    required
                    placeholder="Categoria"
                  >
                    {categories.map(({ name, icon }) => (
                      <MenuItem value={name}>
                        {`${name}`}
                        {<FontAwesomeIcon icon={icon} />}
                      </MenuItem>
                    ))}
                  </Select>
                </Stack>
                <Stack direction="row" ml={2} mt={2}>
                  <div>
                    <FormControl sx={{ m: 1, width: 300 }}>
                      <InputLabel id="feature-multiple-checkbox-label">
                        Caracteristicas
                      </InputLabel>
                      <Select
                        labelId="feature-multiple-checkbox-label"
                        id="feature-multiple-checkbox"
                        multiple
                        value={feature}
                        onChange={handleChange}
                        input={<OutlinedInput label="Caracteristicas" />}
                        renderValue={(selected) => selected.join(", ")}
                        MenuProps={MenuProps}
                      >
                        {features.map((name) => (
                          <MenuItem key={name} value={name}>
                            <Checkbox checked={feature.indexOf(name) > -1} />
                            <ListItemText primary={name} />
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                </Stack>

                <Stack direction="row" ml={2} mt={2}>
                  <Typography align="inherit" mt={0.3} variant="button">
                    {"Cargar imagen"}
                  </Typography>

                  <input
                    id="fileinput"
                    onChange={selectedHandler}
                    type="file"
                    className="form-control"
                    multiple
                  />
                </Stack>

                <Stack direction="row" ml={2} mt={2}>
                  <Button
                    //onClick={sendHandler}
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
  const iconList = Object.keys(Icons)
    .filter((key) => key !== "fas" && key !== "prefix")
    .map((icon) => Icons[icon]);

  library.add(...iconList);
  const { register, handleSubmit, control } = useForm();

  const [place, setPlace] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [feature, setFeature] = useState([]);
  const [features, setFeatures] = useState([]);
  const [files, setFiles] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setFeature(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const handleChangeSelectedCategory = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedCategory(value);
  };

  const getData = async () => {
    const responsePlace = petitions.GetPlaceById(id);
    const responseCategories = petitions.GetCategories();
    const place = await responsePlace;
    const categories = await responseCategories;
    const featureValues = await petitions.GetFeatures();
    setFeatures(featureValues.map((x) => x.name));
    setPlace(place);
    setFeature(place.features);
    setCategories(categories);
    setSelectedCategory(place.category ? place.category.trim() : "");
  };

  const onSubmit = async (data) => {
    let fileName = await sendHandler();
    data.images = fileName;
    data.categories = categories;
    data.features = feature;
    petitions.EditPlace(data, id);
  };

  const selectedHandler = (e) => {
    setFiles(e.target.files);
  };

  const sendHandler = async () => {
    let arrayImages = [];
    for (var i = 0; i < files.length; i++) {
      const response = await petitions.SaveImageAndGetName(files[i]);
      arrayImages.push(response);
    }
    return arrayImages;
  };

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
                  {ModalTutorial()}
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

                <Stack ml={2} mt={2}>
                  <FormControl sx={{ m: 1, width: 300 }}>
                    <InputLabel id="feature-multiple-checkbox-label">
                      Categoria
                    </InputLabel>
                    <Select
                      {...register("category")}
                      required
                      input={<OutlinedInput label="Categoria" />}
                      value={selectedCategory}
                      onChange={handleChangeSelectedCategory}
                    >
                      {categories.map(({ name, icon }) => (
                        <MenuItem value={name}>
                          {name}
                          {<FontAwesomeIcon icon={icon} />}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Stack>
                <Stack direction="row" ml={2} mt={2}>
                  <div>
                    <FormControl sx={{ m: 1, width: 300 }}>
                      <InputLabel id="feature-multiple-checkbox-label">
                        Caracteristicas
                      </InputLabel>
                      <Select
                        {...register("features")}
                        multiple
                        value={feature}
                        onChange={handleChange}
                        input={<OutlinedInput label="Caracteristicas" />}
                        renderValue={(selected) => selected.join(", ")}
                        MenuProps={MenuProps}
                      >
                        {features.map((name) => (
                          <MenuItem key={name} value={name}>
                            <Checkbox checked={feature.indexOf(name) > -1} />
                            <ListItemText primary={name} />
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                </Stack>
                <Stack direction="row" ml={2} mt={2}>
                  <Typography align="inherit" mt={0.3} variant="button">
                    {"Cargar imagen"}
                  </Typography>

                  <input
                    id="fileinput"
                    onChange={selectedHandler}
                    type="file"
                    className="form-control"
                    multiple
                  />
                </Stack>
                <Stack direction="row" ml={2} mt={2}>
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

function ModalTutorial() {
  const stylebox = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    height: "90%",
    width: 750,
    overflow: "auto",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div>
      <Button onClick={handleOpen}>Como busco longitud/latitud</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={stylebox}>
          <p>
            <b>1-</b> Entre a la pagina de OpenStreetMap, en la ubicación de
            General Belgrano:{" "}
            <a
              href="https://www.openstreetmap.org/node/198451376#map=16/-35.7669/-58.4957"
              target="_blank"
            >
              Pagina
            </a>
          </p>
          <p>
            <b>2-</b> De click derecho en el punto donde desea ubicar el lugar.
          </p>
          <p>
            <b>3-</b> Pulse en "Mostrar Dirección"
            <p>
              <img
                src={`http://localhost:8080/images/tutorial_1.jpg`}
                width="100%"
                height="100%"
              />
            </p>
          </p>
          <p>
            <b>4-</b> En la izquierda se desplegara la información, el numero
            izquierdo corresponde a la longitud, el siguiente a la latitud.
            Recuerde no copiar la coma que separa los datos.
            <p>
              <img
                src={`http://localhost:8080/images/tutorial_2.jpg`}
                width="100%"
                height="100%"
              />
            </p>
          </p>
          <Button
            variant="contained"
            style={{ background: "#053742" }}
            onClick={handleClose}
          >
            Cerrar
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
