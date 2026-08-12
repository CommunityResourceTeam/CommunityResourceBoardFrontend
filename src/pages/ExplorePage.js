import React, { useState } from 'react';
import { Box, Grid } from '@mui/material';
import { useSearchParams } from 'react-router-dom';

import CRBPostCondensed from '../components/CRBPostCondensed';
import CRBTagSelect from '../components/CRBTagSelect';
import CRBTagPicker from '../components/CRBTagPicker';
import CRBPopUpBox from '../components/CRBPopUpBox';
import CRBSlider from '../components/CRBSlider';

function ExplorePage() {
    const [searchParams, setSearchParams] = useSearchParams(); //searchParams hook

    // Read the current 'query' value from the URL (defaults to empty string)
    const query = searchParams.get('query') || '';

    const [searchInput, setSearchInput] = useState(query); //A state variable to store what we're searching
    const [appliedSearch, setAppliedSearch] = useState(query); //A state variable to update the resources and map after searching

    const [showFilterModal, setShowFilterModal] = useState(false);

    const handleSearchSubmit = (e) => {
        if (e) e.preventDefault();

        // Update local filter state
        setAppliedSearch(searchInput);

        // Update URL query string without reloading the page
        if (searchInput.trim()) {
            setSearchParams({ search: searchInput });
        } else {
            setSearchParams({}); // Clear query param if empty
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
                        <button type="button" onClick={() => setShowFilterModal(true)}>
                            More filters
                        </button>
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

            {showFilterModal && (
                <CRBPopUpBox onClose={() => setShowFilterModal(false)}>
                    <h3>Filtering Options</h3>
                    
                    <CRBSlider />
                </CRBPopUpBox>
            )}
        </Box>
    )
}

export default ExplorePage;