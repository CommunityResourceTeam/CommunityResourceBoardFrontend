import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

export default function CRBButtonPrimary() {
  return (
    <Stack direction="row" spacing={2}>
      <Button variant="contained">
        Primary
      </Button>
      <Button variant="contained" disabled>
        Disabled
      </Button>
      <Button variant="contained" href="#contained-buttons">
        Link
      </Button>
    </Stack>
  );
}
