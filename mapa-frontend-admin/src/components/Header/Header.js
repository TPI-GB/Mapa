import * as React from 'react';
import {
    AppBar,
    Box,
    Toolbar,
    Typography,
    Button,
    IconButton
  } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import "./Header.scss";

export default function Header() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
            </IconButton>          
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Button color="inherit" href="/Home">
            Home
          </Button>
          </Typography>        
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Button color="inherit" href="/ControlPanel">
            Panel de Control
          </Button>
          </Typography>          
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Button color="inherit">
            Estadisticas
            </Button>
          </Typography>          
          <Button color="inherit">Log Out</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}