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
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "@mui/material/Button";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import petitions from "../Petitions";
import { useForm } from "react-hook-form";
import SearchIcon from "@mui/icons-material/Search";
import { Stack } from "@mui/material";
import { margin } from "@mui/system";

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
  let places = sessionStorage.getItem("places");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);
  const [features, setFeatures] = useState([]);
  const [feature, setFeature] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    console.log(places);
    if (places === null) {
      const res = await petitions.GetPlaces();
      sessionStorage.setItem("places", JSON.stringify(res));
      places = sessionStorage.getItem("places");
    }
    const categoriesValues = await petitions.GetCategories();
    const featureValues = await petitions.GetFeatures();
    setFeatures(featureValues.map((x) => x.name));
    setCategories(categoriesValues);
    const category = sessionStorage.getItem("category");
    const name = sessionStorage.getItem("name");
    if (name === null) {
      setName(sessionStorage.setItem("name", ""));
    }
    if (category != null) {
      setSelectedCategory(category ? category.trim() : "");
    } else {
      setSelectedCategory("Todas" ? "Todas".trim() : "");
    }
  };

  const { register, handleSubmit } = useForm();

  const handleChangeName = (event) => {
    const {
      target: { value },
    } = event;
    setName(value);
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

  const handleChangeSelectedCategory = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedCategory(value);
  };

  const onSubmit = async (data) => {
    if (data.category === "") {
      data.category = "Todas";
    }
    if (data.features === "") {
      data.features = [];
    }
    sessionStorage.setItem("category", data.category);
    sessionStorage.setItem("name", name);
    const newPlaces = await petitions.GetPlacesFilter(data);
    sessionStorage.setItem("places", JSON.stringify(newPlaces));
    window.location = window.location.href;
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box>
          <TextField
            className="nombre"
            label="Buscar por nombre"
            {...register("name", {
              onChange: handleChangeName,
            })}
            sx={{ minWidth: "300px" }}
            style={{ margin:12 }}
          />
          <FormControl sx={{ width: 300 }} style={{ margin:12 }}>
            <InputLabel id="feature-multiple-checkbox-label">
              Buscar Categoria
            </InputLabel>
            <Select
              {...register("category")}
              value={selectedCategory}
              onChange={handleChangeSelectedCategory}
            >
              <MenuItem value={"Todas"}>Todas</MenuItem>
              {categories.map(({ name, icon }) => (
                <MenuItem value={name}>
                  {`${name}`}
                  {<FontAwesomeIcon icon={icon} />}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ width: 300 }} style={{ margin:12 }}>
            <InputLabel id="feature-multiple-checkbox-label">
              Buscar Caracteristicas
            </InputLabel>
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
          </FormControl>
          <Button
            variant="contained"
            type="submit"
            style={{ background: "#39A2DB" }}
            style={{ margin:15 }}
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
          <Markers />
        </MapContainer>
      </div>
    </div>
  );
}
