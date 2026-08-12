import React, { useState } from 'react';
import { Box, Grid, Modal, Typography, Button } from '@mui/material';
import { useSearchParams } from 'react-router-dom';

import CRBPostCondensed from '../components/CRBPostCondensed';
import CRBTagSelect from '../components/CRBTagSelect';
import CRBTagPicker from '../components/CRBTagPicker';
import CRBSlider from '../components/CRBSlider';

// Style object for the MUI Modal box
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

    const MOCK_POSTS = [
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
        }
    ];

    const [searchParams, setSearchParams] = useSearchParams();

    const query = searchParams.get('query') || '';

    const [searchInput, setSearchInput] = useState(query);
    const [appliedSearch, setAppliedSearch] = useState(query);

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
        <Box>
            <Grid container>
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

                    <Box>
                        <CRBTagSelect />
                    </Box>

                    <Box>
                        {/* MUI Button acting as the trigger */}
                        <Button variant="outlined" onClick={handleOpenModal}>
                            More filters
                        </Button>
                        <button type="button">Sort by &gt;</button>
                    </Box>
                </Grid>

                <Grid item xs={12} md={7} lg={8}>
                    <Box>
                        <h2>Map View</h2>
                        <p>(Map component will render here)</p>
                    </Box>
                </Grid>
            </Grid>

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

                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3}}>
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