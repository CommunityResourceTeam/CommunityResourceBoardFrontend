import React from 'react';
import { Box, Chip } from '@mui/material';

const ALL_TAGS = [
  "Food Assistance",
  "Free",
  "Healthcare",
  "Shelter",
  "Education",
  "Legal Services",
  "Mobile Service",
  "Youth"
];

export default function CRBTagSelect({ selectedTag, onSelectTag }) {
  return (
    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
      {ALL_TAGS.map((tag) => {
        const isSelected = selectedTag === tag;
        return (
          <Chip
            key={tag}
            label={tag}
            size="small"
            onClick={() => onSelectTag(isSelected ? '' : tag)} // Toggle tag selection
            sx={{
              bgcolor: isSelected ? '#ED9C40' : 'pink', // Golden Apricot when selected
              color: isSelected ? '#FFFFFF' : '#333333',
              fontWeight: 600,
              cursor: 'pointer',
              '&:hover': {
                bgcolor: isSelected ? '#d8872e' : 'pink',
              }
            }}
          />
        );
      })}
    </Box>
  );
}