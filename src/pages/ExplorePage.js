import React, { useState } from 'react';
import { Box, Grid, Modal, Typography, Button, Stack } from '@mui/material';
import { useSearchParams } from 'react-router-dom';

// Leaflet Core & React Leaflet Imports
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Leaflet Marker Icon Assets
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Local Component Imports
import CRBPostCondensed from '../components/CRBPostCondensed';
import CRBTagSelect from '../components/CRBTagSelect';
import CRBSlider from '../components/CRBSlider';
import { MOCK_POSTS } from '../components/mockPosts';

// Fix missing default marker icon issue in React Leaflet builds
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconUrl: markerIcon,
    iconRetinaUrl: markerIcon2x,
    shadowUrl: markerShadow,
});

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

// Default map center coordinates (Seattle)
const SEATTLE_CENTER = [47.6062, -122.3321];

function ExplorePage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get('query') || '';

    const [searchInput, setSearchInput] = useState(query);
    const [appliedSearch, setAppliedSearch] = useState(query);
    const [posts, setPosts] = useState(MOCK_POSTS); // State holding resource array

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
        <Box sx={{ p: 2 }}>
            <Grid container spacing={2}>
                {/* Left Side Column: Filters, Search & Cards */}
                <Grid size={{ xs: 12, md: 5, lg: 4 }}>
                    <form onSubmit={handleSearchSubmit}>
                        <input 
                            type="text"
                            placeholder="Search Seattle resources..."
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                        />
                        <button type="submit">Search</button>
                    </form>

                    <Box sx={{ my: 1 }}>
                        <CRBTagSelect />
                    </Box>

                    <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                        <Button variant="outlined" onClick={handleOpenModal}>
                            More filters
                        </Button>
                        <button type="button">Sort by &gt;</button>
                    </Box>

                    {/* Condensed Resource Posts List */}
                    <Stack spacing={2} sx={{ maxHeight: '70vh', overflowY: 'auto', pr: 1 }}>
                        {posts.map((post) => (
                            <CRBPostCondensed key={post._id} post={post} />
                        ))}
                    </Stack>
                </Grid>

                {/* Right Side Column: Map View */}
                <Grid size={{ xs: 12, md: 7, lg: 8 }}>
                    <Box 
                        sx={{ 
                            height: 'calc(100vh - 100px)', 
                            minHeight: '500px', 
                            border: '1px solid #ccc',
                            borderRadius: 2,
                            overflow: 'hidden',
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
                                    >
                                        <Popup>
                                            <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
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
                    </Box>
                </Grid>
            </Grid>

            {/* Filter Modal */}
            <Modal
                open={showFilterModal}
                onClose={handleCloseModal}
                aria-labelledby="filter-modal-title"
                aria-describedby="filter-modal-description"
            >
                <Box sx={modalStyle}>
                    <Typography id="filter-modal-title" variant="h6" component="h3" sx={{ color: 'black' }}>
                        Filtering Options
                    </Typography>
                    
                    <Box sx={{ mt: 2 }}>
                        <CRBSlider />
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
                        <Button onClick={handleCloseModal} variant="contained">
                            Done
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </Box>
    );
}

export default ExplorePage;