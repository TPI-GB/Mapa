import * as React from "react";
import { AppBar, Box, Toolbar, Typography, Button } from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import "./Header.scss";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

export default function Header() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ background: "#053742" }}>
        <Toolbar>
          <Search>
            <SearchIcon />
          </Search>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Button href="/listplaces" color="inherit">
              Lugares
            </Button>
          </Typography>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Button href="/listfeatures" color="inherit">
              Características
            </Button>
          </Typography>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Button href="/listcategories" color="inherit">
              Categorías
            </Button>
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
