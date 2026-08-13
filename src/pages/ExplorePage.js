import React, { useState } from 'react';
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
import CRBPostCondensed from '../components/CRBPostCondensed';
import CRBTagSelect from '../components/CRBTagSelect';
import CRBSlider from '../components/CRBSlider';
import { MOCK_POSTS } from '../components/mockPosts';

// Color Palette Constants
const COLORS = {
  background: '#FFFEF0', // Ivory (Background)
  primary: '#ED9C40',    // Golden Apricot (Primary - 60%)
  secondary: '#FAB2EA',  // Blush Pop (Secondary - 30%)
  darkText: '#333333',
};

// Custom Golden Apricot Map Marker Icon Setup
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
  const query = searchParams.get('query') || '';

  const [searchInput, setSearchInput] = useState(query);
  const [appliedSearch, setAppliedSearch] = useState(query);
  const [posts, setPosts] = useState(MOCK_POSTS);

  // Modal state handlers
  const [showFilterModal, setShowFilterModal] = useState(false);
  const handleOpenModal = () => setShowFilterModal(true);
  const handleCloseModal = () => setShowFilterModal(false);

  const handleSearchSubmit = (e) => {
    if (e) e.preventDefault();
    setAppliedSearch(searchInput);

    if (searchInput.trim()) {
      setSearchParams({ search: searchInput });
    } else {
      setSearchParams({});
    }
  };

  return (
    <Box sx={{ bgcolor: COLORS.background, minHeight: '100vh', p: 3 }}>
      <Grid container spacing={3}>
        
        {/* Left Side Column: Search, Tags, Filters & Resource Cards */}
        <Grid size={{ xs: 12, md: 5, lg: 4 }} sx={{ minWidth: 0, width: '100%' }}>
          
          {/* Pretty Search Box Container */}
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
              placeholder="Search Seattle resources..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              InputProps={{
                disableUnderline: true,
                sx: { px: 1, fontSize: '0.95rem' }
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

          {/* Tags Container styled with Secondary Accent (Blush Pop) */}
          <Box
            sx={{
              my: 1.5,
              width: '100%',
              maxWidth: '100%',
              '& .MuiStack-root': {
                flexWrap: 'wrap',
                rowGap: 1,
              },
              '& .MuiChip-root': {
                bgcolor: COLORS.secondary,
                color: COLORS.darkText,
                fontWeight: 600,
                border: 'none',
                '&:hover': {
                  bgcolor: '#f793e2',
                }
              }
            }}
          >
            <CRBTagSelect />
          </Box>

          {/* Filter & Sort Control Buttons */}
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

            <Button
              variant="text"
              endIcon={<SortIcon />}
              sx={{
                color: COLORS.darkText,
                fontWeight: 'bold',
                borderRadius: 2,
                '&:hover': {
                  bgcolor: 'rgba(250, 178, 234, 0.2)',
                }
              }}
            >
              Sort by
            </Button>
          </Box>

          {/* Resource Cards Stack (Stretched & without nested inner scrollbars) */}
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
            {posts.map((post) => (
              <CRBPostCondensed key={post._id} post={post} />
            ))}
          </Stack>
        </Grid>

        {/* Right Side Column: Styled Interactive Map */}
        <Grid size={{ xs: 12, md: 7, lg: 8 }}>
          <Paper
            elevation={0}
            sx={{
              height: 'calc(100vh - 100px)',
              minHeight: '500px',
              border: `2px solid ${COLORS.primary}`,
              borderRadius: 4,
              overflow: 'hidden',
              boxShadow: '0px 6px 20px rgba(237, 156, 64, 0.12)',
              position: 'sticky',
              top: 24,
              '& .leaflet-container': {
                height: '100%',
                width: '100%',
                zIndex: 1
              }
            }}
          >
            <MapContainer
              center={SEATTLE_CENTER}
              zoom={13}
              scrollWheelZoom={true}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {posts.map((post) => {
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
                      <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                        {post.description}
                      </Typography>
                    </Popup>
                  </Marker>
                );
              })}
            </MapContainer>
          </Paper>
        </Grid>
      </Grid>

      {/* Styled Filtering Options Modal */}
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