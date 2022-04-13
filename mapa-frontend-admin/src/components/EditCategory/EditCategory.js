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
  Select,
  MenuItem,
} from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import CheckCircleTwoToneIcon from "@mui/icons-material/CheckCircleTwoTone";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as Icons from "@fortawesome/free-solid-svg-icons";
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
  const iconList = Object.keys(Icons)
    .filter((key) => key !== "fas" && key !== "prefix")
    .map((icon) => Icons[icon]);

  library.add(...iconList);
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    petitions.CreateCategory(data);
  };

  return (
    <Stack direction="row" ml={2} mt={3}>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Button
            variant="contained"
            style={{ background: "#053742" }}
            href="/listcategories"
          >
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
                <Stack direction="row" ml={2} mt={4}>
                  <h6>Seleccione un icono</h6>
                </Stack>
                <Stack direction="row" ml={2}>
                  <Select {...register("icon")} required>
                    <MenuItem value="glass-martini-alt">
                      <FontAwesomeIcon icon="glass-martini-alt" />
                    </MenuItem>
                    <MenuItem value="glass-cheers">
                      <FontAwesomeIcon icon="glass-cheers" />
                    </MenuItem>
                    <MenuItem value="beer">
                      <FontAwesomeIcon icon="beer" />
                    </MenuItem>
                    <MenuItem value="cocktail">
                      <FontAwesomeIcon icon="cocktail" />
                    </MenuItem>
                    <MenuItem value="coffee">
                      <FontAwesomeIcon icon="coffee" />
                    </MenuItem>
                    <MenuItem value="birthday-cake">
                      <FontAwesomeIcon icon="birthday-cake" />
                    </MenuItem>
                    <MenuItem value="utensils">
                      <FontAwesomeIcon icon="utensils" />
                    </MenuItem>
                    <MenuItem value="pizza-slice">
                      <FontAwesomeIcon icon="pizza-slice" />
                    </MenuItem>
                    <MenuItem value="ice-cream">
                      <FontAwesomeIcon icon="ice-cream" />
                    </MenuItem>
                    <MenuItem value="hotdog">
                      <FontAwesomeIcon icon="hotdog" />
                    </MenuItem>
                    <MenuItem value="hamburger">
                      <FontAwesomeIcon icon="hamburger" />
                    </MenuItem>
                    <MenuItem value="cheese">
                      <FontAwesomeIcon icon="cheese" />
                    </MenuItem>
                    <MenuItem value="cookie">
                      <FontAwesomeIcon icon="cookie" />
                    </MenuItem>
                    <MenuItem value="bread-slice">
                      <FontAwesomeIcon icon="bread-slice" />
                    </MenuItem>
                    <MenuItem value="cart-arrow-down">
                      <FontAwesomeIcon icon="cart-arrow-down" />
                    </MenuItem>
                    <MenuItem value="tooth">
                      <FontAwesomeIcon icon="tooth" />
                    </MenuItem>
                    <MenuItem value="dog">
                      <FontAwesomeIcon icon="dog" />
                    </MenuItem>
                    <MenuItem value="bone">
                      <FontAwesomeIcon icon="bone" />
                    </MenuItem>
                    <MenuItem value="heart">
                      <FontAwesomeIcon icon="heart" />
                    </MenuItem>
                    <MenuItem value="hospital-alt">
                      <FontAwesomeIcon icon="hospital-alt" />
                    </MenuItem>
                    <MenuItem value="clinic-medical">
                      <FontAwesomeIcon icon="clinic-medical" />
                    </MenuItem>
                    <MenuItem value="microscope">
                      <FontAwesomeIcon icon="microscope" />
                    </MenuItem>
                    <MenuItem value="book-open">
                      <FontAwesomeIcon icon="book-open" />
                    </MenuItem>
                    <MenuItem value="money-bill-alt">
                      <FontAwesomeIcon icon="money-bill-alt" />
                    </MenuItem>
                    <MenuItem value="money-check">
                      <FontAwesomeIcon icon="money-check" />
                    </MenuItem>
                    <MenuItem value="address-card">
                      <FontAwesomeIcon icon="address-card" />
                    </MenuItem>
                    <MenuItem value="bed">
                      <FontAwesomeIcon icon="bed" />
                    </MenuItem>
                    <MenuItem value="spa">
                      <FontAwesomeIcon icon="spa" />
                    </MenuItem>
                    <MenuItem value="building" selected>
                      <FontAwesomeIcon icon="building" />
                    </MenuItem>
                    <MenuItem value="hotel">
                      <FontAwesomeIcon icon="hotel" />
                    </MenuItem>
                    <MenuItem value="church">
                      <FontAwesomeIcon icon="church" />
                    </MenuItem>
                    <MenuItem value="balance-scale">
                      <FontAwesomeIcon icon="balance-scale" />
                    </MenuItem>
                    <MenuItem value="fire-extinguisher">
                      <FontAwesomeIcon icon="fire-extinguisher" />
                    </MenuItem>
                    <MenuItem value="mouse">
                      <FontAwesomeIcon icon="mouse" />
                    </MenuItem>
                    <MenuItem value="cut">
                      <FontAwesomeIcon icon="cut" />
                    </MenuItem>
                    <MenuItem value="wifi">
                      <FontAwesomeIcon icon="wifi" />
                    </MenuItem>
                    <MenuItem value="biking">
                      <FontAwesomeIcon icon="biking" />
                    </MenuItem>
                    <MenuItem value="futbol">
                      <FontAwesomeIcon icon="futbol" />
                    </MenuItem>
                    <MenuItem value="palette">
                      <FontAwesomeIcon icon="palette" />
                    </MenuItem>
                    <MenuItem value="restroom">
                      <FontAwesomeIcon icon="restroom" />
                    </MenuItem>
                    <MenuItem value="bus">
                      <FontAwesomeIcon icon="bus" />
                    </MenuItem>
                    <MenuItem value="gas-pump">
                      <FontAwesomeIcon icon="gas-pump" />
                    </MenuItem>
                    <MenuItem value="gamepad">
                      <FontAwesomeIcon icon="gamepad" />
                    </MenuItem>
                    <MenuItem value="tshirt">
                      <FontAwesomeIcon icon="tshirt" />
                    </MenuItem>
                    <MenuItem value="school">
                      <FontAwesomeIcon icon="school" />
                    </MenuItem>
                    <MenuItem value="film">
                      <FontAwesomeIcon icon="film" />
                    </MenuItem>
                    <MenuItem value="store">
                      <FontAwesomeIcon icon="store" />
                    </MenuItem>
                    <MenuItem value="running">
                      <FontAwesomeIcon icon="running" />
                    </MenuItem>
                    <MenuItem value="dumbbell">
                      <FontAwesomeIcon icon="dumbbell" />
                    </MenuItem>
                    <MenuItem value="table-tennis">
                      <FontAwesomeIcon icon="table-tennis" />
                    </MenuItem>
                    <MenuItem value="golf-ball">
                      <FontAwesomeIcon icon="golf-ball" />
                    </MenuItem>
                    <MenuItem value="football-ball">
                      <FontAwesomeIcon icon="football-ball" />
                    </MenuItem>
                    <MenuItem value="volleyball-ball">
                      <FontAwesomeIcon icon="volleyball-ball" />
                    </MenuItem>
                    <MenuItem value="swimmer">
                      <FontAwesomeIcon icon="swimmer" />
                    </MenuItem>
                    <MenuItem value="hockey-puck">
                      <FontAwesomeIcon icon="hockey-puck" />
                    </MenuItem>
                    <MenuItem value="university">
                      <FontAwesomeIcon icon="university" />
                    </MenuItem>
                    <MenuItem value="money-check">
                      <FontAwesomeIcon icon="money-check" />
                    </MenuItem>
                    <MenuItem value="hand-holding-medical">
                      <FontAwesomeIcon icon="hand-holding-medical" />
                    </MenuItem>
                    <MenuItem value="trash-restore">
                      <FontAwesomeIcon icon="trash-restore" />
                    </MenuItem>
                    <MenuItem value="guitar">
                      <FontAwesomeIcon icon="guitar" />
                    </MenuItem>
                    <MenuItem value="baby">
                      <FontAwesomeIcon icon="baby" />
                    </MenuItem>
                    <MenuItem value="photo-video">
                      <FontAwesomeIcon icon="photo-video" />
                    </MenuItem>
                    <MenuItem value="praying-hands">
                      <FontAwesomeIcon icon="praying-hands" />
                    </MenuItem>
                    <MenuItem value="umbrella-beach">
                      <FontAwesomeIcon icon="umbrella-beach" />
                    </MenuItem>
                  </Select>
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

function FormEditCategory(id) {
  const iconList = Object.keys(Icons)
    .filter((key) => key !== "fas" && key !== "prefix")
    .map((icon) => Icons[icon]);

  library.add(...iconList);
  const [category, setCategory] = useState([]);

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getData = async () => {
    const response = petitions.GetCategoryById(id);
    const category = await response;
    setCategory(category);
  };
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    petitions.EditCategory(data, id);
  };

  return (
    <Stack direction="row" ml={2} mt={3}>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Button
            variant="contained"
            style={{ background: "#053742" }}
            href="/listcategories"
          >
            <KeyboardBackspaceIcon /> Volver
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
                <Stack direction="row" ml={2}>
                  <Select {...register("icon")} required>
                    <MenuItem value="glass-martini-alt">
                      <FontAwesomeIcon icon="glass-martini-alt" />
                    </MenuItem>
                    <MenuItem value="glass-cheers">
                      <FontAwesomeIcon icon="glass-cheers" />
                    </MenuItem>
                    <MenuItem value="beer">
                      <FontAwesomeIcon icon="beer" />
                    </MenuItem>
                    <MenuItem value="cocktail">
                      <FontAwesomeIcon icon="cocktail" />
                    </MenuItem>
                    <MenuItem value="coffee">
                      <FontAwesomeIcon icon="coffee" />
                    </MenuItem>
                    <MenuItem value="birthday-cake">
                      <FontAwesomeIcon icon="birthday-cake" />
                    </MenuItem>
                    <MenuItem value="utensils">
                      <FontAwesomeIcon icon="utensils" />
                    </MenuItem>
                    <MenuItem value="pizza-slice">
                      <FontAwesomeIcon icon="pizza-slice" />
                    </MenuItem>
                    <MenuItem value="ice-cream">
                      <FontAwesomeIcon icon="ice-cream" />
                    </MenuItem>
                    <MenuItem value="hotdog">
                      <FontAwesomeIcon icon="hotdog" />
                    </MenuItem>
                    <MenuItem value="hamburger">
                      <FontAwesomeIcon icon="hamburger" />
                    </MenuItem>
                    <MenuItem value="cheese">
                      <FontAwesomeIcon icon="cheese" />
                    </MenuItem>
                    <MenuItem value="cookie">
                      <FontAwesomeIcon icon="cookie" />
                    </MenuItem>
                    <MenuItem value="bread-slice">
                      <FontAwesomeIcon icon="bread-slice" />
                    </MenuItem>
                    <MenuItem value="cart-arrow-down">
                      <FontAwesomeIcon icon="cart-arrow-down" />
                    </MenuItem>
                    <MenuItem value="tooth">
                      <FontAwesomeIcon icon="tooth" />
                    </MenuItem>
                    <MenuItem value="dog">
                      <FontAwesomeIcon icon="dog" />
                    </MenuItem>
                    <MenuItem value="bone">
                      <FontAwesomeIcon icon="bone" />
                    </MenuItem>
                    <MenuItem value="heart">
                      <FontAwesomeIcon icon="heart" />
                    </MenuItem>
                    <MenuItem value="hospital-alt">
                      <FontAwesomeIcon icon="hospital-alt" />
                    </MenuItem>
                    <MenuItem value="clinic-medical">
                      <FontAwesomeIcon icon="clinic-medical" />
                    </MenuItem>
                    <MenuItem value="microscope">
                      <FontAwesomeIcon icon="microscope" />
                    </MenuItem>
                    <MenuItem value="book-open">
                      <FontAwesomeIcon icon="book-open" />
                    </MenuItem>
                    <MenuItem value="money-bill-alt">
                      <FontAwesomeIcon icon="money-bill-alt" />
                    </MenuItem>
                    <MenuItem value="money-check">
                      <FontAwesomeIcon icon="money-check" />
                    </MenuItem>
                    <MenuItem value="address-card">
                      <FontAwesomeIcon icon="address-card" />
                    </MenuItem>
                    <MenuItem value="bed">
                      <FontAwesomeIcon icon="bed" />
                    </MenuItem>
                    <MenuItem value="spa">
                      <FontAwesomeIcon icon="spa" />
                    </MenuItem>
                    <MenuItem value="building" selected>
                      <FontAwesomeIcon icon="building" />
                    </MenuItem>
                    <MenuItem value="hotel">
                      <FontAwesomeIcon icon="hotel" />
                    </MenuItem>
                    <MenuItem value="church">
                      <FontAwesomeIcon icon="church" />
                    </MenuItem>
                    <MenuItem value="balance-scale">
                      <FontAwesomeIcon icon="balance-scale" />
                    </MenuItem>
                    <MenuItem value="fire-extinguisher">
                      <FontAwesomeIcon icon="fire-extinguisher" />
                    </MenuItem>
                    <MenuItem value="mouse">
                      <FontAwesomeIcon icon="mouse" />
                    </MenuItem>
                    <MenuItem value="cut">
                      <FontAwesomeIcon icon="cut" />
                    </MenuItem>
                    <MenuItem value="wifi">
                      <FontAwesomeIcon icon="wifi" />
                    </MenuItem>
                    <MenuItem value="biking">
                      <FontAwesomeIcon icon="biking" />
                    </MenuItem>
                    <MenuItem value="futbol">
                      <FontAwesomeIcon icon="futbol" />
                    </MenuItem>
                    <MenuItem value="palette">
                      <FontAwesomeIcon icon="palette" />
                    </MenuItem>
                    <MenuItem value="restroom">
                      <FontAwesomeIcon icon="restroom" />
                    </MenuItem>
                    <MenuItem value="bus">
                      <FontAwesomeIcon icon="bus" />
                    </MenuItem>
                    <MenuItem value="gas-pump">
                      <FontAwesomeIcon icon="gas-pump" />
                    </MenuItem>
                    <MenuItem value="gamepad">
                      <FontAwesomeIcon icon="gamepad" />
                    </MenuItem>
                    <MenuItem value="tshirt">
                      <FontAwesomeIcon icon="tshirt" />
                    </MenuItem>
                    <MenuItem value="school">
                      <FontAwesomeIcon icon="school" />
                    </MenuItem>
                    <MenuItem value="film">
                      <FontAwesomeIcon icon="film" />
                    </MenuItem>
                    <MenuItem value="store">
                      <FontAwesomeIcon icon="store" />
                    </MenuItem>
                    <MenuItem value="running">
                      <FontAwesomeIcon icon="running" />
                    </MenuItem>
                    <MenuItem value="dumbbell">
                      <FontAwesomeIcon icon="dumbbell" />
                    </MenuItem>
                    <MenuItem value="table-tennis">
                      <FontAwesomeIcon icon="table-tennis" />
                    </MenuItem>
                    <MenuItem value="golf-ball">
                      <FontAwesomeIcon icon="golf-ball" />
                    </MenuItem>
                    <MenuItem value="football-ball">
                      <FontAwesomeIcon icon="football-ball" />
                    </MenuItem>
                    <MenuItem value="volleyball-ball">
                      <FontAwesomeIcon icon="volleyball-ball" />
                    </MenuItem>
                    <MenuItem value="swimmer">
                      <FontAwesomeIcon icon="swimmer" />
                    </MenuItem>
                    <MenuItem value="hockey-puck">
                      <FontAwesomeIcon icon="hockey-puck" />
                    </MenuItem>
                    <MenuItem value="university">
                      <FontAwesomeIcon icon="university" />
                    </MenuItem>
                    <MenuItem value="money-check">
                      <FontAwesomeIcon icon="money-check" />
                    </MenuItem>
                    <MenuItem value="hand-holding-medical">
                      <FontAwesomeIcon icon="hand-holding-medical" />
                    </MenuItem>
                    <MenuItem value="trash-restore">
                      <FontAwesomeIcon icon="trash-restore" />
                    </MenuItem>
                    <MenuItem value="guitar">
                      <FontAwesomeIcon icon="guitar" />
                    </MenuItem>
                    <MenuItem value="baby">
                      <FontAwesomeIcon icon="baby" />
                    </MenuItem>
                    <MenuItem value="photo-video">
                      <FontAwesomeIcon icon="photo-video" />
                    </MenuItem>
                    <MenuItem value="praying-hands">
                      <FontAwesomeIcon icon="praying-hands" />
                    </MenuItem>
                    <MenuItem value="umbrella-beach">
                      <FontAwesomeIcon icon="umbrella-beach" />
                    </MenuItem>
                  </Select>
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
