import * as React from "react";

import Box from '@mui/material/Box';
import Input from '@mui/material/Input';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Stack } from "@mui/material";

import AddLocationAltTwoToneIcon from '@mui/icons-material/AddLocationAltTwoTone';

const ariaLabel = { 'aria-label': 'description' };

export default function Lugares() {

    const [categoria, setCategoria] = React.useState('');

    const handleChange = (event) => {
        setCategoria(event.target.value);
    };

  return (
    <>
        
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1 },
      }}
      noValidate
      autoComplete="off"
    >        
    <AddLocationAltTwoToneIcon fontSize="large" />     
      <Input placeholder="Nombre" inputProps={ariaLabel} />
      <Input placeholder="Direccion" inputProps={ariaLabel} />
      <Input placeholder="Latitud" inputProps={ariaLabel} />
      <Input placeholder="Longitud" inputProps={ariaLabel} />

      
      <FormControl width="100" margin='normal' size="large">
        <InputLabel id="demo-simple-select-label">Categoria</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={categoria}
          label="Categoria"
          onChange={handleChange}
        >
            <Stack direction="column" ml={2} mt={2}>
          <MenuItem value={""}>Educacion</MenuItem>
          <MenuItem value={""}>Gastronomia</MenuItem>
          <MenuItem value={""}>Alojamiento</MenuItem>
          </Stack>
        </Select>
      </FormControl>
      
    </Box>
    
    </>

      
  );
}

