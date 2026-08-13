// MUI Imports
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Stack from "@mui/material/Stack";

// CRB Imports
import CRBEmailInput from "../components/CRBEmailInput";
import CRBPasswordInput from "../components/CRBPasswordInput";
import Navbar from "../components/Navbar";

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

function LoginStack() {
  return (
    <>
      <Navbar />
      <Box sx={{ height: '100vh', width: '100%', bgcolor: '#FFFEF0', display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
        <Box sx={{ height: '50%', width: '40%', border: 10, borderRadius: '2em', borderColor: '#ED9C40', bgcolor: '#FFFEF0', display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
          <Stack
              direction="column"
              spacing={2}
              sx={{
                justifyContent: "space-evenly",
                alignItems: "center",
                color: '#ED9C40',
              }}
          >
            <Typography variant='h2'>Login</Typography>
            <StackItem> <CRBEmailInput /> </StackItem> 
            <StackItem> <CRBPasswordInput /> </StackItem> 
              
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
              Login
            </Button>

          </Stack>
        </Box>
      </Box>
    </>
  );
}

export default function Login() {
  return (
    <LoginStack />
  )
}