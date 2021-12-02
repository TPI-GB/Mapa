import * as React from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "./Home.css";
import { Box, Button, Modal, Stack, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useForm } from "react-hook-form";

import "./Home.scss";

export default function Home() {
  return (
    <div className="Map">
      <MapContainer
        className="Map-container"
        center={[51.505, -0.09]}
        zoom={13}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
      <InfoPlace />
    </div>
  );
}

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

function InfoPlace(place) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { register, handleSubmit } = useForm();

  const commentSubmit = (data) => console.log(data);
  const ratingSubmit = (data) => console.log(data);

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
          <Stack>El nombre</Stack>
          <Stack className="modal-title">
            <b>Descripcion</b>
          </Stack>
          <Stack>La descripcion</Stack>
          <Stack className="modal-title">
            <b>Categorias</b>
          </Stack>
          <Stack>
            <li>categoria 1</li>
            <li>categoria 2</li>
          </Stack>
          <Stack className="modal-title">
            <b>Caracteristicas</b>
          </Stack>
          <Stack>
            <li>caracteristica 1</li>
            <li>caracteristica 2</li>
          </Stack>
          <Stack className="modal-title">
            <b>Puntaje:</b>
          </Stack>
          <form onSubmit={handleSubmit(ratingSubmit)}>
            <Stack className="modal-title">
              <b>Dar puntuación</b>
            </Stack>
            <Stack direction="row">
              <select {...register("rating")}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </Stack>
          </form>
          <Stack direction="row" mt="3px">
            <Button
              variant="contained"
              type="submit"
              style={{ background: "gray" }}
            >
              Dejar puntaje
            </Button>
          </Stack>
          <Stack className="modal-title">
            <b>Opiniones</b>
          </Stack>
          <Stack>Opiniones</Stack>
          <form onSubmit={handleSubmit(commentSubmit)}>
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
        </Box>
      </Modal>
    </div>
  );
}
