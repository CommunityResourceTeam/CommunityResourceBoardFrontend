import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Stack from "@mui/material/Stack";

import CRBEmailInput from "../components/CRBEmailInput";
import CRBPasswordInput from "../components/CRBPasswordInput";

function LoginStack() {
  return (
    <Box sx={{ width: '100%', bgcolor: 'lightblue', }}>
      <Stack
            direction="column"
            spacing={0.5}
            sx={{
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
      >
        <CRBEmailInput /> 
        <CRBPasswordInput /> 

        <Button
          variant="contained"
          sx={{
            fontSize: '100%',
            ml: 10,
            bgcolor: "pink",
            "&:hover": { bgcolor: "red" }
          }}
        >
          Login
        </Button>

      </Stack>
    </Box>
  );
}

export default function Login() {
  return (
    <LoginStack />
  )
}