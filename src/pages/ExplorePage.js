import React, { useState } from 'react';
import { Box, Grid, Modal, Typography, Button, Stack } from '@mui/material';
import { useSearchParams } from 'react-router-dom';

import CRBPostCondensed from '../components/CRBPostCondensed';
import CRBTagSelect from '../components/CRBTagSelect';
import CRBSlider from '../components/CRBSlider';
import { MOCK_POSTS } from '../components/mockPosts';

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
                <Grid item xs={12} md={5} lg={4}>
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
                <Grid item xs={12} md={7} lg={8}>
                    <Box sx={{ height: '100%', minHeight: '500px', border: '1px solid #ccc', p: 2 }}>
                        <h2>Map View</h2>
                        <p>(React Leaflet Map component will render here using post.location.coordinates)</p>
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