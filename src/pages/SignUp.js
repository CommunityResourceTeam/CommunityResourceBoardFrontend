import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Stack from "@mui/material/Stack";

import CRBEmailInput from "../components/CRBEmailInput";
import CRBZipcodeInput from '../components/CRBZipCodeInput';
import CRBPasswordInput from "../components/CRBPasswordInput";

function SignUpName() {

}

function SignUpUserName() {
  
}

function SignUpStack() {
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
        <CRBEmailInput /> 
        <CRBZipcodeInput /> 
        <CRBZipcodeInput /> 
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
          Sign Up
        </Button>

      </Stack>
    </Box>
  );
}

export default function Login() {
  return (
    <SignUpStack />
  )
}