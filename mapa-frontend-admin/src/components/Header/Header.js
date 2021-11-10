import * as React from "react";
import { AppBar, Box, Toolbar, Typography, Button } from "@mui/material";
import "./Header.scss";

import { useHistory } from "react-router-dom";

export default function Header() {
  const history = useHistory();
  const logOut = () => {
    sessionStorage.clear();
    history.push("/login");
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Button color="inherit" href="/home"></Button>
          </Typography>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Button color="inherit"></Button>
          </Typography>
          <Button color="inherit" onClick={logOut}>
            Log Out
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
