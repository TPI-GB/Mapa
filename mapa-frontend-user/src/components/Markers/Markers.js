import React from "react";
import { Marker, Popup } from "react-leaflet";
import {
  Box,
  Button,
  Menu,
  MenuItem,
  Modal,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useForm } from "react-hook-form";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as Icons from "@fortawesome/free-solid-svg-icons";
import { renderToStaticMarkup } from "react-dom/server";
import { divIcon } from "leaflet";
import { useState, useEffect } from "react";
import petitions from "../Petitions";

const Markers = (props) => {
  const { places } = props;
  const markers = places.map((place, i) => (
    <Marker
      key={i}
      position={[place.lactitude, place.longitude]}
      icon={IconPlace(place)}
    >
      <Popup>
        <h3>{place.name}</h3>
        <p>{place.description}</p>
        <p>{InfoPlace(place)}</p>
      </Popup>
    </Marker>
  ));
  return markers;
};

const stylebox = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  height: "100%",
  width: 750,
  overflow: "auto",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function IconPlace(place) {
  const iconList = Object.keys(Icons)
    .filter((key) => key !== "fas" && key !== "prefix")
    .map((icon) => Icons[icon]);

  library.add(...iconList);
  const [icon, setIcon] = useState([]);
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const response = await petitions.GetIconNameByCategoryName(place.category);
    setIcon(response);
  };
  const iconMarkup = renderToStaticMarkup(<FontAwesomeIcon icon={icon} />);
  const customMarkerIcon = divIcon({
    html: iconMarkup,
    className: "dummy",
  });
  return customMarkerIcon;
}

function InfoPlace(place) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  let colorRating;

  if (place.rating <= 2) {
    colorRating = "red";
  } else if (place.rating <= 3) {
    colorRating = "yellow";
  } else {
    colorRating = "green";
  }

  return (
    <div>
      <Button onClick={handleOpen}>Ver info</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={stylebox}>
          <Button onClick={handleClose}>
            <CloseIcon color="primary" />
          </Button>
          <Stack>
            <img
              src={`https://www.uba.ar/internacionales/archivos/TEST.jpg`}
              width="100%"
              height="100%"
            />
          </Stack>
          <Stack className="modal-title">
            <b>Nombre</b>
          </Stack>
          <Stack>{place.name}</Stack>
          <Stack className="modal-title">
            <b>Categoria</b>
          </Stack>
          <Stack>{place.category}</Stack>
          <Stack className="modal-title">
            <b>Descripcion</b>
          </Stack>
          <Stack>{place.description}</Stack>
          <Stack className="modal-title">
            <b>Caracteristicas</b>
          </Stack>
          <Stack>
            {place.features.map((f) => (
              <li>{f}</li>
            ))}
          </Stack>
          <Stack className="modal-title">
            <b>
              Puntaje
              <div style={{ color: `${colorRating}` }}>{place.rating}</div>
            </b>
          </Stack>
          {FormRating(place)}
          {FormComment(place)}
          <Stack className="modal-title">
            <b>Opiniones</b>
          </Stack>
          <Stack mt={2}>
            {place.comments.map((c) => (
              <Stack mt={1}>
                <div
                  style={{
                    backgroundColor: "lightblue",
                  }}
                >
                  <b>{c.name}</b>
                  <p>{c.text}</p>
                </div>
              </Stack>
            ))}
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}

function FormComment(place) {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    const newComment = await petitions.CreateComment(data);
    let dataCommentToPlace = {};
    dataCommentToPlace.place = place;
    dataCommentToPlace.comment = newComment;
    petitions.AddCommentToPlace(dataCommentToPlace);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack className="modal-title">
        <b>Dejar una opinion</b>
      </Stack>
      <Stack direction="row">
        <TextField
          style={{ background: "white" }}
          {...register("name")}
          required
          label="Nombre"
          placeholder="Nombre"
        />
      </Stack>
      <Stack mt="3px">
        <TextField
          style={{ background: "white" }}
          {...register("text")}
          required
          label="Comentario"
          placeholder="Comentario"
        />
      </Stack>
      <Stack direction="row" mt="3px">
        <Button
          variant="contained"
          type="submit"
          style={{ background: "gray" }}
        >
          Dejar opinion
        </Button>
      </Stack>
    </form>
  );
}

function FormRating(place) {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    data.place = place;
    console.log(data);
    petitions.EditRating(data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack className="modal-title">
        <b>Dar puntuación</b>
      </Stack>
      <Stack direction="row">
        <Select {...register("rating")}>
          <MenuItem value="1">1</MenuItem>
          <MenuItem value="2">2</MenuItem>
          <MenuItem value="3">3</MenuItem>
          <MenuItem value="4">4</MenuItem>
          <MenuItem value="5">5</MenuItem>
        </Select>
      </Stack>
      <Stack direction="row" mt="3px">
        <Button
          variant="contained"
          type="submit"
          style={{ background: "gray" }}
        >
          Dejar puntaje
        </Button>
      </Stack>
    </form>
  );
}

export default Markers;
