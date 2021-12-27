import * as React from "react";
import petitions from "../Petitions/Petitions";
import { Stack, Grid, Card, CardContent, TextField } from "@mui/material";
import { useForm } from "react-hook-form";

export default function FormNewPlace() {
  const { handleSubmit } = useForm({});

  const onSubmit = (data) => {
    petitions.GetPlacesFilter(data);
    console.log(data);
  };

  const handleChange = (event) => {
    let textoIngresado = event.target.value;
    petitions.GetPlacesFilter(textoIngresado);
  };

  return (
    <Stack direction="row" ml={2} mt={3}>
      <Grid container spacing={2}>
        <Grid item xs={4} style={{ textAlign: "center" }}>
          <Card style={{ background: "#E8F0F2" }} sx={{ minWidth: 400 }}>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Stack direction="row" ml={2}>
                  <TextField
                    onChange={handleChange}
                    required
                    style={{ background: "white" }}
                    name="nombre"
                    label="Nombre"
                  />
                </Stack>
              </form>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Stack>
  );
}
