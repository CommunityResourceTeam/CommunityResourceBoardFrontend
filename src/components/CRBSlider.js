import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import MuiInput from '@mui/material/Input';
import LocationOn from '@mui/icons-material/LocationOn';

const Input = styled(MuiInput)`
  width: 50px;
`;

export default function CRBSlider() {
  // Default search radius (e.g., 10 miles)
  const [value, setValue] = React.useState(10);

  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleInputChange = (event) => {
    setValue(event.target.value === '' ? 0 : Number(event.target.value));
  };

  const handleBlur = () => {
    if (value < 1) {
      setValue(1);
    } else if (value > 50) {
      setValue(50);
    }
  };

  return (
    <Box sx={{ width: 300 }}>
      <Typography id="distance-slider" gutterBottom sx={{ color: 'black', fontWeight: 500 }}>
        Search Distance:
      </Typography>

      <Grid container spacing={2} sx={{ alignItems: 'center' }}>
        <Grid>
          <LocationOn color="action" />
        </Grid>
        
        <Grid size="grow">
          <Slider
            value={typeof value === 'number' ? value : 0}
            onChange={handleSliderChange}
            min={1}
            max={50}
            aria-labelledby="distance-slider"
            valueLabelDisplay="auto"
            valueLabelFormat={(val) => `${val} mi`}
          />
        </Grid>

        <Grid>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Input
              value={value}
              size="small"
              onChange={handleInputChange}
              onBlur={handleBlur}
              inputProps={{
                step: 1,
                min: 1,
                max: 50,
                type: 'number',
                'aria-labelledby': 'distance-slider',
              }}
            />
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              miles
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}