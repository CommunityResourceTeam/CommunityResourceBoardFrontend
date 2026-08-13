// MUI Imports
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from "@mui/material/Stack";

// CRB Imports
import CRBEmailInput from "../components/CRBEmailInput";
import CRBZipcodeInput from '../components/CRBZipCodeInput';
import CRBPasswordInput from "../components/CRBPasswordInput";
import Navbar from "../components/Navbar";

// Sign Up Name Input Field
function SignUpName() {
  return (
    <Box
      component="form"
      sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
      noValidate
      autoComplete="off"
    >
      <TextField
        id="outlined-suffix-shrink"
        label="Name"
        variant="outlined"
      />
    </Box>
  );
}

// Sign Up Username Input Field
function SignUpUsername() {
  return (
    <Box
      component="form"
      sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
      noValidate
      autoComplete="off"
    >
      <TextField
        id="outlined-suffix-shrink"
        label="Username"
        variant="outlined"
      />
    </Box>
  );
}

// Stack Layout
const StackItem = styled(Paper)(({ theme }) => ({
  backgroundColor: '#ED9C40',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: (theme.vars ?? theme).palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));

function SignUpStack() {
  return (
    <>
      <Navbar />
      <Box sx={{ height: '100vh', width: '100%', bgcolor: '#FFFEF0', display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
        <Box sx={{ height: '75%', width: '40%', border: 10, borderRadius: '2em', borderColor: '#ED9C40', bgcolor: '#FFFEF0', display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
          <Stack 
              direction="column"
              spacing={0.5}
              sx={{
                justifyContent: "space-evenly",
                alignItems: "center",
                color: '#ED9C40',
              }}
          >
            <Typography variant='h2'>Sign Up</Typography>
            <StackItem> <SignUpName /> </StackItem>
            <StackItem> <SignUpUsername /> </StackItem>
            <StackItem> <CRBEmailInput /> </StackItem>
            <StackItem> <CRBPasswordInput /> </StackItem>
            <StackItem> <CRBZipcodeInput /> </StackItem>

            <Button
              href="/explorePage"
              variant="contained"
              sx={{
                fontSize: '100%',
                ml: 10,
                bgcolor: "#FAB2EA",
                "&:hover": { bgcolor: "#ED9C40" }
              }}
            >
              Sign Up
            </Button>
          </Stack>
        </Box>
      </Box>
    </>
  );
}

export default function Login() {
  return (
    <SignUpStack />
  )
}