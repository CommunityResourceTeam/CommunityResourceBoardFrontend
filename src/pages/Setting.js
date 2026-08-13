// React Imports
import * as React from 'react';
import { useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";

// Multiple Use MUI Import
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

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
import CRBEmailInput from '../components/CRBEmailInput'
import CRBPasswordInput from '../components/CRBPasswordInput'
import CRBZipCodeInput from '../components/CRBZipCodeInput'

// Posts Grid Layout
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

function PostsGrid() {
  const [posts, setPosts] = useState([]);

  const addPost = () => {
    setPosts(prev => [...prev, { id: Date.now() }]);
  };

  const deletePost = () => {
    setPosts(prev => prev.slice(0, -1));
  };
  
  return (
    <>
      {/* Header & Buttons */}
      <div style={{ minHeight: '100vh', width: '100%' }}>
          <Stack
          direction="row"
          sx={{ width: '100%', mb: 2 }}
        >
          <Typography variant="h3" sx={{color: '#ED9C40'}}>Your Post</Typography>

          <Button
            onClick={addPost}
            variant="contained"
            sx={{
              fontSize: '100%',
              ml: 10,
              bgcolor: "#FAB2EA",
              "&:hover": { bgcolor: "#ED9C40" }
            }}
          >
            Add Post
          </Button>
          
          <Button
            onClick={deletePost}
            variant="contained"
            sx={{
              fontSize: '100%',
              ml: 10,
              bgcolor: "#FAB2EA",
              "&:hover": { bgcolor: "red" }
            }}
          >
            Delete Post
          </Button>
        </Stack>
        {/* Posts */}
        <Box sx={{ flexGrow: 1 }}>
          <Grid
            container
            spacing={8}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            {posts.map(post => (
              <CRBPostCondensed key={post.id} />
            ))}
          </Grid>
        </Box>
      </div>
    </>
  )
}

// Setting Stack Layout
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
        <StackItem> <Typography sx={{display: 'flex', justifyContent: 'left'}}>Change E-Mail</Typography> <CRBEmailInput /> </StackItem>
        <StackItem> <Typography sx={{display: 'flex', justifyContent: 'left'}}>Change Zip Code</Typography> <CRBZipCodeInput /> </StackItem>
        <StackItem> <Typography sx={{display: 'flex', justifyContent: 'left'}}>Change Password</Typography> <CRBPasswordInput /> </StackItem>
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
          {children}
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

// Main Export
export default function Setting() {
  // The Array of paths (Create/Delete them here)
  const routes = ["/posts", "/setting"];

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
      sx={{ flexGrow: 1, display: 'flex', height: 'auto', width: 'auto'}}
    >
      {/* The Tabs */}
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          sx={{
              bgcolor: '#FFFEF0',
              borderRight: 10,
              borderColor: '#ED9C40',
              width: 180,
              minHeight: '100vh',
              flexShrink: 0
            }}
        >
          {/* Create/Delete them here (Connected to the Paths) */}
          <Tab label="Posts" />
          <Tab label="Setting" />
        </Tabs>
      {/* The Tab Panels (Create/Delete them here [Connected to The Tabs]) */}
        <Box sx={{bgcolor: '#FFFEF0', display: 'flex', width: '100%', justifyContent: "space-evenly", alignItems: "center"}}>  
          <TabPanel value={value} index={0}>
            <PostsGrid />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <SettingStack />
          </TabPanel>
        </Box>
      </Box>
  );
}
