import * as React from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer } from "react-leaflet";
import Markers from "../Markers";
import "./MapView.scss";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "@mui/material/Button";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import petitions from "../Petitions";
import { useForm } from "react-hook-form";
import SearchIcon from "@mui/icons-material/Search";

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

export default function MapView() {
  const [places, setPlaces] = useState([]);
  const [categories, setCategories] = useState([]);
  const [features, setFeatures] = useState([]);
  const [feature, setFeature] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const placesValues = await petitions.GetPlaces();
    const responseCategories = petitions.GetCategories();
    const categories = await responseCategories;
    setCategories(categories);
    const featureValues = await petitions.GetFeatures();
    setPlaces(placesValues);
    setFeatures(featureValues.map((x) => x.name));
  };

  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    const newPlaces = await petitions.GetPlacesFilter(data);
    setPlaces(newPlaces);
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

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box>
          <TextField
            className="nombre"
            label="Buscar por nombre"
            onChange={handleChange}
            {...register("name")}
            sx={{ minWidth: "300px" }}
          />
          <Select {...register("category")} placeholder="Seleccionar categoria">
            {categories.map(({ name, icon }) => (
              <MenuItem value={name}>
                {`${name}`}
                {<FontAwesomeIcon icon={icon} />}
              </MenuItem>
            ))}
          </Select>
          <Select
            {...register("features")}
            labelId="feature-multiple-checkbox-label"
            id="feature-multiple-checkbox"
            multiple
            value={feature}
            onChange={handleChange}
            input={<OutlinedInput label="Seleccionar caracteristicas" />}
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
          <Button
            variant="contained"
            type="submit"
            style={{ background: "#39A2DB" }}
          >
            <SearchIcon />
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
