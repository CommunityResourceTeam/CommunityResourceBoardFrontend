import Box from '@mui/material/Box';
import { inputBaseClasses } from '@mui/material/InputBase';
import TextField from '@mui/material/TextField';

export default function CRBZipcodeInput() {
  return (
    <Box
      component="form"
      sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
      noValidate
      autoComplete="off"
    >
      <TextField
        id="outlined-suffix-shrink"
        label="ZipCode"
        variant="outlined"
      />
    </Box>
  );
}
