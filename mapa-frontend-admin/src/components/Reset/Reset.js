import * as React from "react";
import Box from "@mui/material/Box";
import {
  TextField,
  Button,
  Stack,
  Grid,
  Card,
  CardContent,
  Modal,
} from "@mui/material";
import "./Reset.scss";
import Typography from "@mui/material/Typography";

export default function Reset() {
  return (
    <Stack direction="row" ml={2} mt={5}>
      <Grid container spacing={2}>
        <Grid item xs={4}></Grid>
        <Grid item xs={4} style={{ textAlign: "center" }}>
          <Card sx={{ minWidth: 275 }}>
            <CardContent>
              <Box
                component="span"
                sx={{
                  width: 125,
                  height: 275,
                  "&:hover": {
                    opacity: [0.9, 0.8, 0.7],
                  },
                  "& .MuiTextField-root": { m: 6, width: "8cm", ml: 1 },
                }}
                noValidate
                autoComplete="off"
              >
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Ingresá tu correo electrónico para recuperar tu contraseña.
                </Typography>

                <TextField
                  required
                  id="outlined-required"
                  label="Email"
                  defaultValue=""
                />

                <ModalReset />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Stack>
  );
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxshadow: 24,
  p: 4,
};

function ModalReset() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className="style">
      <Stack direction="row" ml={4}>
        <Button variant="contained" onClick={handleOpen}>
          Enviar
        </Button>
      </Stack>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        footer={null}
        width="700px"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Tu correo electronico fue enviado con éxito.
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Revise su correo electronico para recuperar su contraseña.
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}

//Agregar error cuando el mail sea incorrecto
