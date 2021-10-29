import * as React from "react";
import {
  Button,
  Stack,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import SettingsIcon from '@mui/icons-material/Settings';
import "./ControlPanel.scss";

export default function ControlPanel() {
  return (
    <div className="stack">
        <Stack  direction="row" ml={2} mt={5}>
      <Grid container spacing={2}>
        <Grid item xs={4}></Grid>
        <Grid item xs={4} style={{ textAlign: "center" }}>
          <Card  sx={{ minWidth: 275 }}>
            <CardContent className="card">  
            <SettingsIcon fontSize="large"/>
              <h1>Panel de Control</h1>              
              <Stack direction="column" ml={2} mt={2} >
                <Button variant="contained" href="/listusers">Lista de Moderadores</Button>
              </Stack>
              <Stack direction="column" ml={2} mt={2} >
                <Button variant="contained">Editar Datos</Button>
              </Stack>
              <Stack direction="column" ml={2} mt={2} >
                <Button variant="contained" href="/Home">
                  Regresar
                </Button>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Stack>
    </div>
    
  );
}
