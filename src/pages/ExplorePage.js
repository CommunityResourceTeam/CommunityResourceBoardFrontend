import React, { useState, useMemo } from 'react';
import { Box, Grid, Modal, Typography, Button, Stack, Paper, TextField } from '@mui/material';
import { useSearchParams } from 'react-router-dom';

// Leaflet Core & React Leaflet Imports
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Icons
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import SortIcon from '@mui/icons-material/Sort';

// Leaflet Marker Icon Assets
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Local Component Imports
import Navbar from '../components/Navbar';
import CRBPostCondensed from '../components/CRBPostCondensed';
import CRBPostExpanded from '../components/CRBPostExpanded';
import CRBTagSelect from '../components/CRBTagSelect';
import CRBSlider from '../components/CRBSlider';
import { MOCK_POSTS } from '../components/mockPosts';

// Color Palette Constants
const COLORS = {
  background: '#FFFEF0', // Ivory
  primary: '#ED9C40',    // Golden Apricot
  secondary: '#FAB2EA',  // Blush Pop
  darkText: '#333333',
};

// Custom Map Marker Icon Setup
const customMarkerIcon = L.icon({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: COLORS.background,
  borderRadius: 3,
  border: `2px solid ${COLORS.primary}`,
  boxShadow: '0px 10px 25px rgba(237, 156, 64, 0.2)',
  p: 4,
};

const SEATTLE_CENTER = [47.6062, -122.3321];

function ExplorePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParam = searchParams.get('query') || searchParams.get('search') || '';

  // Input state for live typing & selected tag filter
  const [searchInput, setSearchInput] = useState(queryParam);
  const [appliedSearch, setAppliedSearch] = useState(queryParam);
  const [selectedTag, setSelectedTag] = useState('');

  // State for expanded post modal
  const [selectedPost, setSelectedPost] = useState(null);

  // Filter Modal state handlers
  const [showFilterModal, setShowFilterModal] = useState(false);
  const handleOpenModal = () => setShowFilterModal(true);
  const handleCloseModal = () => setShowFilterModal(false);

  // Handle Search Submission
  const handleSearchSubmit = (e) => {
    if (e) e.preventDefault();
    setAppliedSearch(searchInput);

    if (searchInput.trim()) {
      setSearchParams({ search: searchInput });
    } else {
      setSearchParams({});
    }
  };

  // 🔍 FILTERING LOGIC: Syncs cards in left column AND map pins simultaneously
  const filteredPosts = useMemo(() => {
    return MOCK_POSTS.filter((post) => {
      // 1. Title Search Filter
      const matchesTitle = post.title
        .toLowerCase()
        .includes(appliedSearch.toLowerCase().trim());

      // 2. Selected Tag Filter
      const matchesTag = selectedTag
        ? post.tags?.some((t) => t.name.toLowerCase() === selectedTag.toLowerCase())
        : true;

      return matchesTitle && matchesTag;
    });
  }, [appliedSearch, selectedTag]);

  return (
    <Box sx={{ bgcolor: COLORS.background, minHeight: '100vh' }}>
      
      {/* 1. Sticky Site Navbar Wrapper */}
      <Box
        sx={{
          position: 'sticky',
          top: 0,
          zIndex: 1100,
          bgcolor: COLORS.background,
          boxShadow: '0px 2px 8px rgba(0,0,0,0.06)',
        }}
      >
        <Navbar />
      </Box>

      {/* 2. Main Page Content Grid */}
      <Box sx={{ p: 3 }}>
        <Grid container spacing={3}>
          
          {/* Left Side Column */}
          <Grid size={{ xs: 12, md: 5, lg: 4 }} sx={{ minWidth: 0, width: '100%' }}>
            
            <Typography
              variant="h4"
              component="h1"
              sx={{
                fontWeight: 'bold',
                color: COLORS.primary,
                mb: 2,
                letterSpacing: '-0.5px'
              }}
            >
              Explore Resources
            </Typography>

            {/* Title Search Form */}
            <Paper
              elevation={0}
              component="form"
              onSubmit={handleSearchSubmit}
              sx={{
                display: 'flex',
                alignItems: 'center',
                p: '4px 8px',
                borderRadius: 3,
                border: `2px solid ${COLORS.primary}`,
                bgcolor: '#FFFFFF',
                mb: 2,
              }}
            >
              <TextField
                fullWidth
                variant="standard"
                placeholder="Search resources by title..."
                value={searchInput}
                onChange={(e) => {
                  setSearchInput(e.target.value);
                  // Optional: Live search on type
                  setAppliedSearch(e.target.value);
                }}
                slotProps={{
                  input: {
                    disableUnderline: true,
                    sx: { px: 1, fontSize: '0.95rem' }
                  }
                }}
              />
              <Button
                type="submit"
                variant="contained"
                disableElevation
                sx={{
                  bgcolor: COLORS.primary,
                  color: '#FFFFFF',
                  borderRadius: 2,
                  px: 2,
                  py: 0.8,
                  fontWeight: 'bold',
                  '&:hover': {
                    bgcolor: '#d8872e',
                  }
                }}
              >
                <SearchIcon fontSize="small" />
              </Button>
            </Paper>

            {/* Tag Selection Row */}
            <Box sx={{ my: 1.5, width: '100%' }}>
              <CRBTagSelect 
                selectedTag={selectedTag} 
                onSelectTag={(tag) => setSelectedTag(tag)} 
              />
            </Box>

            {/* Filter Controls */}
            <Box sx={{ display: 'flex', gap: 1.5, mb: 2 }}>
              <Button
                variant="outlined"
                startIcon={<FilterListIcon />}
                onClick={handleOpenModal}
                sx={{
                  borderColor: COLORS.primary,
                  color: COLORS.primary,
                  fontWeight: 'bold',
                  borderRadius: 2,
                  bgcolor: '#FFFFFF',
                  '&:hover': {
                    borderColor: COLORS.primary,
                    bgcolor: 'rgba(237, 156, 64, 0.08)',
                  }
                }}
              >
                More filters
              </Button>

              {(appliedSearch || selectedTag) && (
                <Button
                  variant="text"
                  onClick={() => {
                    setSearchInput('');
                    setAppliedSearch('');
                    setSelectedTag('');
                    setSearchParams({});
                  }}
                  sx={{ color: COLORS.primary, fontWeight: 'bold' }}
                >
                  Clear Filters
                </Button>
              )}
            </Box>

            {/* Resource Cards Stack (Renders filtered list) */}
            <Stack
              spacing={2}
              sx={{
                width: '100%',
                '& .MuiCard-root': {
                  maxWidth: '100% !important',
                  mx: '0 !important',
                  width: '100% !important',
                  borderRadius: 3,
                  border: `1px solid ${COLORS.secondary}`,
                  boxShadow: '0px 4px 12px rgba(237, 156, 64, 0.08)',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                  '&:hover': {
                    transform: 'translateY(-3px)',
                    boxShadow: '0px 8px 20px rgba(237, 156, 64, 0.18)',
                  }
                }
              }}
            >
              {filteredPosts.length > 0 ? (
                filteredPosts.map((post) => (
                  <Box 
                    key={post._id} 
                    onClick={() => setSelectedPost(post)} 
                    sx={{ cursor: 'pointer' }}
                  >
                    <CRBPostCondensed post={post} />
                  </Box>
                ))
              ) : (
                <Typography color="text.secondary" sx={{ p: 2, textAlign: 'center' }}>
                  No resources found matching your search.
                </Typography>
              )}
            </Stack>
          </Grid>

          {/* Right Side Column: Map synced directly with filteredPosts */}
          <Grid size={{ xs: 12, md: 7, lg: 8 }}>
            <Paper
              elevation={0}
              sx={{
                height: 'calc(100vh - 120px)',
                minHeight: '500px',
                border: `2px solid ${COLORS.primary}`,
                borderRadius: 4,
                overflow: 'hidden',
                boxShadow: '0px 6px 20px rgba(237, 156, 64, 0.12)',
                position: 'sticky',
                top: 80,
                '& .leaflet-container': {
                  height: '100%',
                  width: '100%',
                  zIndex: 1
                }
              }}
            >
              <MapContainer
                center={SEATTLE_CENTER}
                zoom={12}
                scrollWheelZoom={true}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {/* Pins render only for active filteredPosts */}
                {filteredPosts.map((post) => {
                  const { latitude, longitude } = post.location.coordinates;
                  return (
                    <Marker
                      key={post._id}
                      position={[latitude, longitude]}
                      icon={customMarkerIcon}
                    >
                      <Popup>
                        <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: COLORS.primary }}>
                          {post.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {post.location.address}, {post.location.city}
                        </Typography>
                        <Typography variant="caption" display="block" sx={{ mt: 1, mb: 1 }}>
                          {post.description}
                        </Typography>
                        <Button 
                          size="small" 
                          variant="contained" 
                          disableElevation
                          onClick={() => setSelectedPost(post)}
                          sx={{ bgcolor: COLORS.primary, color: '#fff', fontSize: '0.7rem' }}
                        >
                          View Details
                        </Button>
                      </Popup>
                    </Marker>
                  );
                })}
              </MapContainer>
            </Paper>
          </Grid>
        </Grid>
      </Box>

      {/* Expanded Post Modal */}
      <CRBPostExpanded 
        open={Boolean(selectedPost)} 
        handleClose={() => setSelectedPost(null)} 
        post={selectedPost} 
      />

      {/* Filter Options Modal */}
      <Modal
        open={showFilterModal}
        onClose={handleCloseModal}
        aria-labelledby="filter-modal-title"
      >
        <Box sx={modalStyle}>
          <Typography id="filter-modal-title" variant="h6" component="h3" sx={{ color: COLORS.primary, fontWeight: 'bold' }}>
            Filtering Options
          </Typography>

          <Box sx={{ mt: 3, mb: 2 }}>
            <CRBSlider />
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
            <Button
              onClick={handleCloseModal}
              variant="contained"
              disableElevation
              sx={{
                bgcolor: COLORS.primary,
                color: '#FFFFFF',
                fontWeight: 'bold',
                borderRadius: 2,
                '&:hover': {
                  bgcolor: '#d8872e',
                }
              }}
            >
              Done
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}

export default ExplorePage;