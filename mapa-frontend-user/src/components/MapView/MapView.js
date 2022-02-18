import * as React from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer } from "react-leaflet";
import Markers from "../Markers";
import "./MapView.scss";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import petitions from "../Petitions";
import { useForm } from "react-hook-form";

export default function MapView() {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const response = await petitions.GetPlaces();
    setPlaces(response);
  };

  const [age, setAge] = React.useState("");

  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    const newPlaces = await petitions.GetPlacesFilter(data);
    setPlaces(newPlaces);
  };

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box>
          <TextField
            className="nombre"
            label="Nombre"
            onChange={handleChange}
            {...register("name")}
            sx={{ minWidth: "300px" }}
          />
          {/* <FormControl sx={{ minWidth: "300px" }}>
            <InputLabel>Categorias</InputLabel>
            <Select
              value={age}
              label="Categorias"
              onChange={handleChange}
              {...register("category")}
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{ minWidth: "300px" }}>
            <InputLabel>Caracteristicas</InputLabel>
            <Select
              value={age}
              label="Caracteristicas"
              onChange={handleChange}
              {...register("features")}
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl> */}
          <Button
            variant="contained"
            type="submit"
            style={{ background: "#39A2DB" }}
          >
            Buscar
          </Button>
        </Box>
      </form>
      <div className="Map">
        <MapContainer
          className="Map-container"
          center={{ lat: "-35.768021379446026", lng: "-58.49708847640829" }}
          zoom={15}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.de/{z}/{x}/{y}.png"
          />
          <Markers places={places} />
        </MapContainer>
      </div>
    </div>
  );
}
