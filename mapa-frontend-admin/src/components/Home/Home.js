import * as React from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import { Grid, Button, Stack } from "@mui/material";

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
            <Stack ml={8}>
              <Button href="/listusers">Usuarios</Button>
            </Stack>
            <Button href="/listcategories">Categorias</Button>
            <Button href="/listplaces">Lugares</Button>
            <Button href="/listfeatures">Caracteristicas</Button>
            <Button href="/null">Estadisticas</Button>
          </Tabs>
        </Box>
      </Grid>
    </Grid>
  );
}
