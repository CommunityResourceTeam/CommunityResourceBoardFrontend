// src/components/CRBPostCondensed.jsx
import React from 'react';
import { Card, CardContent, Typography, Box, Chip } from '@mui/material';

// Helper: Convert "17:00" -> "5:00 PM"
const formatTime = (timeStr) => {
  if (!timeStr) return '';
  const [hours, minutes] = timeStr.split(':');
  const h = parseInt(hours, 10);
  const ampm = h >= 12 ? 'PM' : 'AM';
  const formattedHours = h % 12 || 12;
  return `${formattedHours}:${minutes} ${ampm}`;
};

// Helper: Group duplicate operating hours
const groupHoursByDay = (hours) => {
  if (!hours) return [];

  const daysOrder = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  const dayAbbr = { monday: 'Mon', tuesday: 'Tue', wednesday: 'Wed', thursday: 'Thu', friday: 'Fri', saturday: 'Sat', sunday: 'Sun' };

  const groups = [];

  daysOrder.forEach((day) => {
    const slots = hours[day] || [];
    const formattedSlots = slots.length > 0
      ? slots.map((s) => `${formatTime(s.open)} – ${formatTime(s.close)}`).join(', ')
      : 'Closed';

    const lastGroup = groups[groups.length - 1];

    if (lastGroup && lastGroup.timeText === formattedSlots) {
      lastGroup.days.push(dayAbbr[day]);
    } else {
      groups.push({
        days: [dayAbbr[day]],
        timeText: formattedSlots,
      });
    }
  });

  return groups.map((g) => {
    const dayLabel = g.days.length === 1 
      ? g.days[0] 
      : `${g.days[0]}–${g.days[g.days.length - 1]}`;
    return { dayLabel, timeText: g.timeText };
  });
};

function CRBPostCondensed({ post }) {
  if (!post) return null;

  const { title, description, location, hours, tags = [] } = post;
  const groupedSchedule = groupHoursByDay(hours);

  return (
    <Card 
      sx={{ 
        maxWidth: 340,         // Limits card width
        width: '100%', 
        mx: 'auto',            // Centers card in narrow column
        mb: 1.5, 
        borderRadius: 2, 
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        transition: 'transform 0.15s ease-in-out, box-shadow 0.15s ease-in-out',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: '0 4px 14px rgba(0,0,0,0.12)',
        }
      }}
    >
      <CardContent sx={{ p: '12px !important', textAlign: 'center' }}>
        {/* Resource Title */}
        <Typography variant="subtitle1" component="h3" fontWeight="bold" sx={{ lineHeight: 1.2 }}>
          {title}
        </Typography>

        {/* Description */}
        <Typography 
          variant="caption" 
          color="text.secondary" 
          display="block"
          sx={{ 
            mt: 0.5, 
            lineHeight: 1.3,
            display: '-webkit-box', 
            WebkitLineClamp: 2, 
            WebkitBoxOrient: 'vertical', 
            overflow: 'hidden' 
          }}
        >
          {description}
        </Typography>

        {/* Address */}
        {location?.address && (
          <Typography variant="caption" display="block" color="text.secondary" sx={{ mt: 0.8, fontWeight: 500, fontSize: '0.725rem' }}>
            📍 {location.address}, {location.city}, {location.state} {location.zip}
          </Typography>
        )}

        {/* Bullet Hours Line */}
        {groupedSchedule.length > 0 && (
          <Box 
            sx={{ 
              display: 'flex', 
              flexWrap: 'wrap', 
              justifyContent: 'center', 
              alignItems: 'center',
              columnGap: 0.6, 
              rowGap: 0.3,
              mt: 0.8,
              mb: 1 
            }}
          >
            {groupedSchedule.map((item, idx) => (
              <React.Fragment key={idx}>
                <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem' }}>
                  <strong>{item.dayLabel}:</strong> {item.timeText}
                </Typography>
                {idx < groupedSchedule.length - 1 && (
                  <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem', fontWeight: 'bold' }}>
                    •
                  </Typography>
                )}
              </React.Fragment>
            ))}
          </Box>
        )}

        {/* Compact Tags */}
        {tags.length > 0 && (
          <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', justifyContent: 'center', mt: 1 }}>
            {tags.map((tag) => (
              <Chip 
                key={tag.tagId || tag._id} 
                label={tag.name} 
                size="small" 
                variant="outlined"
                sx={{ height: 20, fontSize: '0.65rem', '& .MuiChip-label': { px: 0.8 } }}
              />
            ))}
          </Box>
        )}
      </CardContent>
    </Card>
  );
}

export default CRBPostCondensed;