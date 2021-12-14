import * as React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import Container from "@mui/material/Container";
import "./Footer.scss";

export default function Footer() {
  return (
    <div className="footer">
      <AppBar position="static" color="transparent">
        <Container maxWidth="md">
          <Toolbar>
            <Typography variant="body1" color="inherit">
              © 2021-Mapa
            </Typography>
          </Toolbar>
        </Container>
      </AppBar>
    </div>    
  );
}
