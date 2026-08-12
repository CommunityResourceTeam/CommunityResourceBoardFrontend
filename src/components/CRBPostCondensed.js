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

// Helper: Group days with identical operating hours
const groupHoursByDay = (hours) => {
  if (!hours) return [];

  const daysOrder = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  const dayAbbr = { 
    monday: 'Mon', 
    tuesday: 'Tue', 
    wednesday: 'Wed', 
    thursday: 'Thu', 
    friday: 'Fri', 
    saturday: 'Sat', 
    sunday: 'Sun' 
  };

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
  // Early return guard against undefined post
  if (!post) return null;

  const { title, description, location, hours, tags = [] } = post;
  const groupedSchedule = groupHoursByDay(hours);

  return (
    <Card sx={{ mb: 2, borderRadius: 2, boxShadow: 1, textAlign: 'center' }}>
      <CardContent>
        {/* Title */}
        <Typography variant="h6" component="h3" fontWeight="bold">
          {title}
        </Typography>

        {/* Description */}
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
          {description}
        </Typography>

        {/* Address */}
        {location?.address && (
          <Typography variant="caption" display="block" color="text.secondary" sx={{ mt: 1, fontWeight: 500 }}>
            📍 {location.address}, {location.city}, {location.state} {location.zip}
          </Typography>
        )}

        {/* Streamlined Hours with Bullet Separators */}
        {groupedSchedule.length > 0 && (
          <Box 
            sx={{ 
              display: 'flex', 
              flexWrap: 'wrap', 
              justifyContent: 'center', 
              alignItems: 'center',
              columnGap: 1, 
              rowGap: 0.5,
              mt: 1,
              mb: 1.5 
            }}
          >
            {groupedSchedule.map((item, idx) => (
              <React.Fragment key={idx}>
                <Typography variant="caption" color="text.secondary">
                  <strong>{item.dayLabel}:</strong> {item.timeText}
                </Typography>
                {idx < groupedSchedule.length - 1 && (
                  <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 'bold' }}>
                    •
                  </Typography>
                )}
              </React.Fragment>
            ))}
          </Box>
        )}

        {/* Tags */}
        {tags.length > 0 && (
          <Box sx={{ display: 'flex', gap: 0.8, flexWrap: 'wrap', justifyContent: 'center', mt: 1 }}>
            {tags.map((tag) => (
              <Chip 
                key={tag.tagId || tag._id} 
                label={tag.name} 
                size="small" 
                variant="outlined" 
              />
            ))}
          </Box>
        )}
      </CardContent>
    </Card>
  );
}

export default CRBPostCondensed;