import * as React from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Grid } from "@mui/material";

export default function Home() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Grid container item spacing={1} backgroundColor="lightblue">
      <Grid item xs={3}></Grid>
      <Grid item xs={6}>
        <Box
          sx={{
            width: "100%",
            backgroundColor: "lightblue",
            textAlign: "center",
          }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="nav tabs example"
          >
            <LinkTab label="Usuario" href="/drafts" />
            <LinkTab label="Categorias" href="/trash" />
            <LinkTab label="Lugares" href="/spam" />
            <LinkTab label="caracteristicas" href="/spam" />
            <LinkTab label="estadisticas" href="/spam" />
          </Tabs>
        </Box>
      </Grid>
    </Grid>
  );
}

function LinkTab(props) {
  return (
    <Tab
      component="a"
      onClick={(event) => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}

