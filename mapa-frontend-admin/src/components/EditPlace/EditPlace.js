import { useParams } from "react-router";
import { useForm } from "react-hook-form";
import petitions from "../Petitions";
import { useEffect, useState } from "react";
import {
  Button,
  Stack,
  Grid,
  Card,
  CardContent,
  TextField,
} from "@mui/material";
import "./EditPlace.scss";

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
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => petitions.RegisterPlace(data);

  return (    
    <Stack direction="row" ml={2} mt={5}>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Button style={{ background: "lightblue" }} href="/places">
            Volver
          </Button>
        </Grid>
        <Grid item xs={4} style={{ textAlign: "center" }}>        
          <Card  sx={{ minWidth: 400 }}>
            <CardContent>
              <h1>Cargar Lugar</h1>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Stack direction="row" ml={2}>
                  <TextField required {...register("name")} label="Nombre" />
                </Stack>
                <Stack direction="row" ml={2}>
                  <TextField required {...register("address")} label="Dirección" />
                </Stack>
                <Stack direction="row" ml={2}>
                  <TextField required {...register("latitude")} label="Latitud" />
                </Stack>
                <Stack direction="row" ml={2}>
                  <TextField required {...register("longitude")} label="Longitud" />
                </Stack>                
                <Stack direction="row" ml={2} mt={2}>
                  <h6>Categoría</h6>
                </Stack>
                <Stack direction="row" ml={2}>
                  <select {...register("rol")}>
                    <option value="Edificio Público">Edificio Público</option>
                    <option value="Gastronomia">Gastronomia</option>
                    <option value="Educación">Educación</option>
                    <option value="Alojamiento">Alojamiento</option>
                    <option value="Salud">Salud</option>
                  </select>
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
  });

  const getData = async () => {
    const response = petitions.GetPlaceById(id);
    const place = await response;
    setPlace(place);
  };

  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => petitions.EditPlace(data, id);

  return (
    <Stack direction="row" ml={2} mt={5}>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Button style={{ background: "lightblue" }} href="/places">
            Volver
          </Button>
        </Grid>
        <Grid item xs={4} style={{ textAlign: "center" }}>
          <Card sx={{ minWidth: 400 }}>
            <CardContent>
              <h1>Editar Lugar</h1>
              <h4>Editando: </h4>
              <h6>
                <b>Nombre:</b> {place.name}
              </h6>
              <h6>
                <b>Dirección:</b> {place.address}
              </h6>
              <h6>
                <b>Latitud:</b> {place.latitude}
              </h6>
              <h6>
                <b>Longitud:</b> {place.longitude}
              </h6>
              <h6>
                <b>Categoria:</b> {place.category}
              </h6>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Stack direction="row" ml={2}>
                  <TextField
                    required
                    {...register("name")}
                    label="Nuevo Nombre"
                  />
                  <Stack direction="row" ml={2} />
                </Stack>
                <Stack direction="row" ml={2}>
                  <TextField
                    required
                    {...register("address")}
                    label="Nueva Dirección"
                  />
                </Stack>
                <Stack direction="row" ml={2}>
                  <TextField
                    required
                    {...register("latitude")}
                    label="Nueva Latitud"
                  />
                </Stack>
                <Stack direction="row" ml={2}>
                  <TextField
                    required
                    {...register("longitude")}
                    label="Nueva Longitud"
                  />
                </Stack>
                <Stack direction="row" ml={2} mt={2}>
                  <h6>Categoría</h6>
                </Stack>
                <Stack direction="row" ml={2}>
                  <select {...register("category")}>
                    <option value="Edificio Público">Edificio Público</option>
                    <option value="Gastronomia">Gastronomia</option>
                    <option value="Educación">Educación</option>
                    <option value="Alojamiento">Alojamiento</option>
                    <option value="Salud">Salud</option>
                  </select>
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
