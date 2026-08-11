import Box from '@mui/material/Box';
import { inputBaseClasses } from '@mui/material/InputBase';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';

export default function CRBGmailInput() {
  return (
    <Box
      component="form"
      sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
      noValidate
      autoComplete="off"
    >
      <TextField
        id="outlined-suffix-shrink"
        label="Gmail"
        variant="outlined"
        slotProps={{
          htmlInput: {
            sx: { textAlign: 'right' },
          },
          input: {
            endAdornment: (
              <InputAdornment
                position="end"
                sx={{
                  margin: 0,
                  opacity: 0,
                  pointerEvents: 'none',
                  [`[data-shrink=true] ~ .${inputBaseClasses.root} > &`]: {
                    opacity: 1,
                  },
                }}
              >
                @gmail.com
              </InputAdornment>
            ),
          },
        }}
      />
    </Box>
  );
}
