import * as React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import Container from "@mui/material/Container";

export default function Footer() {
  return (
    <AppBar position="static" color="secondary">
      <Container maxWidth="md">
        <Toolbar>
          <Typography variant="body1" color="inherit">
            © 2021-Mapa
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
