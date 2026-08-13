import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

export default function CRBTagSelect() {
  const handleClick = () => {
    console.info('You clicked the Chip.');
  };

  return (
    <Stack direction="row" spacing={1}>
      <Chip label="Child Care" onClick={handleClick} 
        style={{backgroundColor: "pink", fontWeight: 'bolder'}}
      />
      <Chip label="Free" onClick={handleClick}
        style={{backgroundColor: "pink", fontWeight: 'bolder'}}
      />      
      <Chip label="Food Resources" onClick={handleClick}
        style={{backgroundColor: "pink", fontWeight: 'bolder'}}
      />
      <Chip label="Health Care" onClick={handleClick} 
        style={{backgroundColor: "pink", fontWeight: 'bolder'}}
      />
      <Chip label="Clothing" onClick={handleClick}
        style={{backgroundColor: "pink", fontWeight: 'bolder'}}
      />      
      <Chip label="Community Safety" onClick={handleClick}
        style={{backgroundColor: "pink", fontWeight: 'bolder'}}
      />
      <Chip label="Entertainment" onClick={handleClick}
        style={{backgroundColor: "pink", fontWeight: 'bolder'}}
      />      
      <Chip label="Transportation" onClick={handleClick}
        style={{backgroundColor: "pink", fontWeight: 'bolder'}}
      />      
    </Stack>
  );
}
