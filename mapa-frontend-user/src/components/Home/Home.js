import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Stack } from "@mui/material";
import { TextField } from "@mui/material";
import "./Home.scss";
import MapView from "../MapView/MapView";

export default function Home() {

 return (
    <div>
      <div>
        <MapView />
      </div>
      <div>
        <InfoPlace />
      </div>      
    </div>
  );
}

const stylebox = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const stylemodal = {
  overflow: "scroll",
};

function InfoPlace(place) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen}>Ver info</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={stylemodal}
      >
        <Box sx={stylebox}>
          <Stack direction="row" ml={1} mt={1}>
            <img
              src={`https://www.uba.ar/internacionales/archivos/TEST.jpg`}
              width="50%"
              height="50%"
            />
          </Stack>
          <Stack direction="row" ml={1} mt={1}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Nombre
            </Typography>
          </Stack>
          <Stack direction="row" ml={1} mt={0}>
            <Typography id="modal-modal-description">El nombre</Typography>
          </Stack>
          <Stack direction="row" ml={1} mt={1}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Descripcion
            </Typography>
          </Stack>
          <Stack direction="row" ml={1} mt={1}>
            <Typography id="modal-modal-description">La descripcion</Typography>
          </Stack>
          <Stack direction="row" ml={1} mt={1}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Categorias
            </Typography>
          </Stack>
          <Stack direction="row" ml={1} mt={1}>
            <Typography id="modal-modal-description">
              <li>categoria 1</li>
              <li>categoria 2</li>
            </Typography>
          </Stack>
          <Stack direction="row" ml={1} mt={1}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Caracteristicas
            </Typography>
          </Stack>
          <Stack direction="row" ml={1} mt={1}>
            <Typography id="modal-modal-description">
              <li>caracteristica 1</li>
              <li>caracteristica 2</li>
            </Typography>
          </Stack>
          <Stack direction="row" ml={1} mt={1}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Puntaje:
            </Typography>
          </Stack>
          <Stack direction="row" ml={1} mt={1}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Dar puntuación
              <select>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </Typography>
          </Stack>
          <Stack direction="row" ml={1} mt={1}>
            <Button
              variant="contained"
              type="submit"
              style={{ background: "gray" }}
            >
              Dejar puntaje
            </Button>
          </Stack>
          <Stack direction="row" ml={1} mt={1}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Opiniones
            </Typography>
          </Stack>
          <Stack direction="row" ml={1} mt={1}>
            <Typography id="modal-modal-description">Opiniones</Typography>
          </Stack>
          <Stack direction="row" ml={1} mt={1}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Dejar una opinion
            </Typography>
          </Stack>
          <Stack direction="row" ml={1} mt={1}>
            <TextField
              style={{ background: "white" }}
              required
              label="Nombre"
            />
          </Stack>
          <Stack direction="row" ml={1} mt={1}>
            <TextField
              style={{ background: "white" }}
              required
              label="Opinion"
            />
          </Stack>
          <Stack direction="row" ml={1} mt={1}>
            <Button
              variant="contained"
              type="submit"
              style={{ background: "gray" }}
            >
              Dejar opinion
            </Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}
