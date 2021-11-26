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
} from "@mui/material";
import CheckCircleTwoToneIcon from "@mui/icons-material/CheckCircleTwoTone";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import "./EditPlace.scss";
import CategorySelect from "./CategorySelect";

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
  const { register, handleSubmit, control } = useForm({});
  const [categories, setCategories] = useState([]);
  const onSubmit = (data) => {
    data.categories = categories;
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
                <Stack direction="row" ml={2}>
                  <CategorySelect
                    control={control}
                    onChangeProp={(e) => {
                      console.log(e);
                      setCategories([...categories, e.target.innerText]);
                    }}
                  />
                </Stack>
                <Stack direction="row" ml={2} mt={2}></Stack>
                <Stack direction="row" ml={2}>
                  <Typography align="inherit" mt={0.3} variant="button">
                    {"Cargar imagen"}
                  </Typography>

                  <input type="file" ref={inputFileRef} />
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

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const responsePlace = petitions.GetPlaceById(id);
    const place = await responsePlace;
    setPlace(place);
  };

  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => petitions.EditPlace(data, id);

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

                <Stack>
                  <CategorySelect />
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

// const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
// const checkedIcon = <CheckBoxIcon fontSize="small" />;

// function CheckboxesTagsCategory({ onchange, control }) {
//   const [categories, setCategories] = useState([]);

//   useEffect(() => {
//     petitions.GetCategories().then((y) => {
//       setCategories(y.map((x) => x.name));
//     });
//   }, []);

//   return (
//     <Autocomplete
//       multiple
//       id="checkboxes-tags-demo"
//       options={categories}
//       disableCloseOnSelect
//       getOptionLabel={(option) => option}
//       renderOption={(props, option, { selected }) => (
//         <li {...props}>
//           <Checkbox
//             icon={icon}
//             checkedIcon={checkedIcon}
//             style={{ marginRight: 8 }}
//             checked={selected}
//           />
//           {option}
//         </li>
//       )}
//       style={{ width: 500 }}
//       renderInput={(params) => <TextField {...params} label="Categorias" />}
//     />
//   );
// }
