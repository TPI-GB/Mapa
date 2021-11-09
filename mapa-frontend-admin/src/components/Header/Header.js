import * as React from "react";
import { AppBar, Box, Toolbar, Typography, Button } from "@mui/material";
import "./Header.scss";

export default function Header() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Button color="inherit" href="/home"></Button>
          </Typography>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Button color="inherit" href="/controlpanel"></Button>
          </Typography>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Button color="inherit"></Button>
          </Typography>
          <Button color="inherit" href="/">
            Log Out
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
