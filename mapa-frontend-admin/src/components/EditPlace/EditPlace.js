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
  Autocomplete,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

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
    data.category = categories;
    petitions.CreatePlace(data);
  };

  const inputFileRef = useRef();

  return (
    <Stack direction="row" ml={2} mt={5}>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Button style={{ background: "lightblue" }} href="/listplaces">
            Volver
          </Button>
        </Grid>
        <Grid item xs={4} style={{ textAlign: "center" }}>
          <Card sx={{ minWidth: 400 }}>
            <CardContent>
              <h1>Cargar Lugar</h1>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Stack direction="row" ml={2}>
                  <TextField required {...register("name")} label="Nombre" />
                </Stack>
                <Stack direction="row" ml={2}>
                  <TextField {...register("address")} label="Dirección" />
                </Stack>
                <Stack direction="row" ml={2}>
                  <TextField
                    required
                    {...register("lactitude")}
                    label="Latitud"
                  />
                </Stack>
                <Stack direction="row" ml={2}>
                  <TextField
                    required
                    {...register("longitude")}
                    label="Longitud"
                  />
                </Stack>
                <Stack direction="row" ml={2} mt={2}></Stack>
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
    <Stack direction="row" ml={2} mt={5}>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Button style={{ background: "lightblue" }} href="/listplaces">
            Volver
          </Button>
        </Grid>
        <Grid item xs={4} style={{ textAlign: "center" }}>
          <Card sx={{ minWidth: 400 }}>
            <CardContent>
              <h1>Editar Lugar</h1>

              <form onSubmit={handleSubmit(onSubmit)}>
                <Stack direction="row" ml={2}>
                  <TextField
                    {...register("name")}
                    label="Nuevo Nombre"
                    placeholder={place.name}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                  <Stack direction="row" ml={2} />
                </Stack>
                <Stack direction="row" ml={2}>
                  <TextField
                    {...register("address")}
                    label="Nueva Dirección"
                    placeholder={place.address}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Stack>
                <Stack direction="row" ml={2}>
                  <TextField
                    {...register("lactitude")}
                    label="Nueva Latitud"
                    placeholder={place.lactitude}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Stack>
                <Stack direction="row" ml={2}>
                  <TextField
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
