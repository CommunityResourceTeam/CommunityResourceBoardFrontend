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
import Navbar from '../components/Navbar';

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

const MarkUpPosts = [
  {
    _id: "post_456",
    authorId: "user_123",
    title: "Food Bank",
    description: "Provides free groceries and meals to individuals and families experiencing food insecurity.",
    location: {
      address: "123 Example St",
      city: "Seattle",
      state: "WA",
      zip: "98101",
      coordinates: { latitude: 47.6062, longitude: -122.3321 }
    },
    hours: {
      monday: [{ open: "09:00", close: "17:00" }],
      tuesday: [{ open: "09:00", close: "17:00" }],
      wednesday: [],
      thursday: [{ open: "10:00", close: "18:00" }],
      friday: [{ open: "09:00", close: "15:00" }],
      saturday: [],
      sunday: []
    },
    website: "https://example.org",
    tags: [
      { tagId: "0", name: "Food Assistance" },
      { tagId: "1", name: "Free" }
    ],
    comments: []
  },
  {
    _id: "post_457",
    authorId: "user_456",
    title: "Community Health Clinic",
    description: "Low-cost medical services, health screenings, and wellness checks.",
    location: {
      address: "456 Healthcare Ave",
      city: "Seattle",
      state: "WA",
      zip: "98104",
      coordinates: { latitude: 47.6011, longitude: -122.3299 }
    },
    hours: {
      monday: [{ open: "08:00", close: "16:00" }],
      tuesday: [{ open: "08:00", close: "16:00" }]
    },
    website: "https://healthclinic.org",
    tags: [
      { tagId: "2", name: "Healthcare" },
      { tagId: "1", name: "Free" }
    ],
    comments: []
  },
  {
    _id: "post_458",
    authorId: "user_789",
    title: "Downtown Emergency Shelter",
    description: "Overnight shelter and case management services for individuals experiencing homelessness.",
    location: {
      address: "789 Pine St",
      city: "Seattle",
      state: "WA",
      zip: "98101",
      coordinates: { latitude: 47.6101, longitude: -122.3344 }
    },
    hours: {
      monday: [{ open: "18:00", close: "08:00" }],
      tuesday: [{ open: "18:00", close: "08:00" }],
      wednesday: [{ open: "18:00", close: "08:00" }],
      thursday: [{ open: "18:00", close: "08:00" }],
      friday: [{ open: "18:00", close: "08:00" }],
      saturday: [{ open: "18:00", close: "08:00" }],
      sunday: [{ open: "18:00", close: "08:00" }]
    },
    website: "https://desc.org",
    tags: [
      { tagId: "3", name: "Shelter" },
      { tagId: "1", name: "Free" },
      { tagId: "4", name: "24/7 Intake" }
    ],
    comments: []
  },
  {
    _id: "post_459",
    authorId: "user_234",
    title: "Youth Tutoring Center",
    description: "Free after-school tutoring and homework help for K-12 students in reading, math, and science.",
    location: {
      address: "321 Learning Ln",
      city: "Seattle",
      state: "WA",
      zip: "98108",
      coordinates: { latitude: 47.5480, longitude: -122.2801 }
    },
    hours: {
      monday: [{ open: "15:00", close: "18:00" }],
      tuesday: [{ open: "15:00", close: "18:00" }],
      wednesday: [{ open: "15:00", close: "18:00" }],
      thursday: [{ open: "15:00", close: "18:00" }],
      friday: [],
      saturday: [{ open: "10:00", close: "13:00" }],
      sunday: []
    },
    website: "https://youthtutoring.org",
    tags: [
      { tagId: "5", name: "Education" },
      { tagId: "1", name: "Free" },
      { tagId: "6", name: "Youth" }
    ],
    comments: []
  },
  {
    _id: "post_460",
    authorId: "user_567",
    title: "Legal Aid Society",
    description: "Free legal consultations for housing disputes, immigration questions, and family law matters.",
    location: {
      address: "555 Justice Blvd",
      city: "Seattle",
      state: "WA",
      zip: "98122",
      coordinates: { latitude: 47.6142, longitude: -122.3011 }
    },
    hours: {
      monday: [{ open: "09:00", close: "17:00" }],
      tuesday: [{ open: "09:00", close: "17:00" }],
      wednesday: [{ open: "09:00", close: "17:00" }],
      thursday: [{ open: "09:00", close: "17:00" }],
      friday: [{ open: "09:00", close: "12:00" }],
      saturday: [],
      sunday: []
    },
    website: "https://legalaidseattle.org",
    tags: [
      { tagId: "7", name: "Legal Services" },
      { tagId: "1", name: "Free" }
    ],
    comments: []
  },
  {
    _id: "post_461",
    authorId: "user_890",
    title: "Mobile Food Pantry",
    description: "Weekly mobile pantry distributing fresh produce and pantry staples at rotating neighborhood locations.",
    location: {
      address: "Varies — check website",
      city: "Seattle",
      state: "WA",
      zip: "98118",
      coordinates: { latitude: 47.5375, longitude: -122.2871 }
    },
    hours: {
      saturday: [{ open: "10:00", close: "14:00" }]
    },
    website: "https://mobilepantryseattle.org",
    tags: [
      { tagId: "0", name: "Food Assistance" },
      { tagId: "1", name: "Free" },
      { tagId: "8", name: "Mobile Service" }
    ],
    comments: []
  }
]

function PostsGrid() {
  const [posts, setPosts] = useState(MarkUpPosts);

  const addPost = () => {
    setPosts(prev => [...prev, MarkUpPosts[Math.floor(Math.random() * MarkUpPosts.length)] ]);
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
              <CRBPostCondensed key={post.id} post={post} />
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
    <>
      <Navbar />
      <Box
        sx={{ flexGrow: 1, display: 'flex', height: 'auto', width: 'auto', pt: 0}}
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
      </>
  );
}
