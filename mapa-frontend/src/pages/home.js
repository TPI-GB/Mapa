import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export default function home() {
  return (    
    <Stack  direction="row"
    justifyContent="center"
    alignItems="center"
    spacing={8}
    mt={2}>            
    <Button variant="contained" href="/login">
        Login
    </Button>
    </Stack>          
  );
}

