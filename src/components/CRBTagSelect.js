import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

export default function ClickableChips() {
  const handleClick = () => {
    console.info('You clicked the Chip.');
  };

  return (
    <Stack direction="row" spacing={1}>
      <Chip label="Food Bank" onClick={handleClick} 
        style={{backgroundColor: "red", fontWeight: 'bolder'}}
      />
      <Chip label="Free" variant="outlined" onClick={handleClick}
        style={{backgroundColor: "blue"}}
      />
    </Stack>
  );
}
