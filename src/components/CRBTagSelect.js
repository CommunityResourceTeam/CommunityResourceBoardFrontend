import React from 'react';
import { Box, Chip } from '@mui/material';

export default function CRBTagSelect({ tags = [] }) {
  const defaultTags = [
    { id: '1', name: 'Child Care', color: '#ffb6c1' },
    { id: '2', name: 'Free', color: '#ffb6c1' },
    { id: '3', name: 'Food Resources', color: '#ffb6c1' },
    { id: '4', name: 'Health Care', color: '#ffb6c1' },
    { id: '5', name: 'Clothing', color: '#ffb6c1' },
    { id: '6', name: 'Community Safety', color: '#ffb6c1' },
    { id: '7', name: 'Entertainment', color: '#ffb6c1' },
    { id: '8', name: 'Transportation', color: '#ffb6c1' }
  ];

  const displayTags = tags.length > 0 ? tags : defaultTags;

  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap', 
        gap: 1,
        width: '100%',
        maxWidth: '100%',
        my: 1,
      }}
    >
      {displayTags.map((tag) => (
        <Chip
          key={tag.id || tag._id}
          label={tag.name}
          clickable
          sx={{
            backgroundColor: tag.color || '#ffb6c1',
            fontWeight: 500,
            fontSize: '0.8rem',
            '&:hover': {
              backgroundColor: '#ffa0b0',
            },
          }}
        />
      ))}
    </Box>
  );
}