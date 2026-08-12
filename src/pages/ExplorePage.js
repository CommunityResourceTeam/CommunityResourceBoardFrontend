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