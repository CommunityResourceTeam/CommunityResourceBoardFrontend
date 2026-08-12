// React Imports
import * as React from 'react';
import { useNavigate, useLocation } from "react-router-dom";

// Multiple Use MUI Import
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

// Vertical Tab Imports
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

// Stack Layout Imports
import Stack from '@mui/material/Stack';

// Grid Layout Imports
import Grid from '@mui/material/Grid';

// CRB Component Imports
import CRBPostCondensed from '../components/CRBPostCondensed';

// Profile Grid Layout
const GridItem = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: (theme.vars ?? theme).palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));

function ProfileGrid() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={3}>
        <Grid>
          <GridItem><CRBPostCondensed /></GridItem>
        </Grid>
        <Grid>
          <GridItem><CRBPostCondensed /></GridItem>
        </Grid>
        <Grid>
          <GridItem><CRBPostCondensed /></GridItem>
        </Grid>
      </Grid>
    </Box>
  );
}

// Setting Stack Layout
const StackItem = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: (theme.vars ?? theme).palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));

function SettingStack() {
  return (
    <Box>
      <Stack
            direction="column"
            spacing={0.5}
            sx={{
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
      >
        <StackItem>StackItem 1</StackItem>
        <StackItem>StackItem 2</StackItem>
        <StackItem>StackItem 3</StackItem>
      </Stack>
    </Box>
  );
}

// Vertical Tabs
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

// Main Export
export default function Setting() {
  // The Array of paths (Create/Delete them here)
  const routes = ["/profile", "/setting"];

  const navigate = useNavigate();
  const location = useLocation();

  // URL -> index
  const value = routes.indexOf(location.pathname);

  // index -> URL
  const handleChange = (_, newValue) => {
    navigate(routes[newValue]);
  };

  return (
    // Overall Box
    <Box
      sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 'auto', width: 'auto'}}
    >
      {/* The Tabs */}
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          sx={{
              borderRight: 10,
              borderColor: 'AccentColor',
              width: 200,
              flexShrink: 0
            }}
        >
          {/* Create/Delete them here (Connected to the Paths) */}
          <Tab label="Profile" />
          <Tab label="Setting" />
        </Tabs>
      {/* The Tab Panels (Create/Delete them here [Connected to The Tabs]) */}
        <TabPanel value={value} index={0}>
          <ProfileGrid />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <SettingStack />
        </TabPanel>
      </Box>
  );
}
