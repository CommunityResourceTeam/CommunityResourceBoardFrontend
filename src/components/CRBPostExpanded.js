import React from 'react';
import {
  Modal,
  Box,
  Typography,
  IconButton,
  Avatar,
  Chip,
  Divider,
  Paper,
  Grid,
  Link,
  TextField,
  Button
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LanguageIcon from '@mui/icons-material/Language';

// Helper: Format 24hr time -> 12hr AM/PM
const formatTime = (timeStr) => {
  if (!timeStr) return '';
  const [hours, minutes] = timeStr.split(':');
  const h = parseInt(hours, 10);
  const ampm = h >= 12 ? 'PM' : 'AM';
  const formattedHours = h % 12 || 12;
  return `${formattedHours}:${minutes} ${ampm}`;
};

// Helper: Group operating hours by day
const groupHoursByDay = (hours) => {
  if (!hours) return [];

  const daysOrder = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  const dayAbbr = { monday: 'Mon', tuesday: 'Tue', wednesday: 'Wed', thursday: 'Thu', friday: 'Fri', saturday: 'Sat', sunday: 'Sun' };

  const groups = [];

  daysOrder.forEach((day) => {
    const slots = hours[day] || [];
    const formattedSlots = slots.length > 0
      ? slots.map((s) => `${formatTime(s.open)}–${formatTime(s.close)}`).join(', ')
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

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  maxWidth: 800,
  maxHeight: '90vh',
  bgcolor: 'background.paper',
  borderRadius: 3,
  boxShadow: 24,
  p: 3,
  overflowY: 'auto',
  outline: 'none',
};

export default function CRBPostExpanded({ open, handleClose, post }) {
  if (!post) return null;

  const {
    title,
    description,
    author,
    createdAt,
    location,
    hours,
    website,
    tags = [],
    comments = [],
  } = post;

  // Extract likes count
  const likesDisplay = String(
    post.likesCount ?? 
    post.location?.likesCount ?? 
    (Array.isArray(post.likes) ? post.likes.length : 0)
  );

  const groupedSchedule = groupHoursByDay(hours);

  // Format post creation date (e.g. "Aug 11, 2026")
  const formattedDate = createdAt
    ? new Date(createdAt).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : '';

  return (
    <Modal open={open} onClose={handleClose} aria-labelledby="post-expanded-title">
      <Box sx={modalStyle}>
        
        {/* ================= HEADER ================= */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Avatar sx={{ width: 40, height: 40 }}>
              {author?.name ? author.name.charAt(0).toUpperCase() : '?'}
            </Avatar>

            {/* Conditionally render author name badge */}
            {(author?.name || author?.username) && (
              <Paper variant="outlined" sx={{ px: 1.5, py: 0.5, borderRadius: 1 }}>
                <Typography variant="body2" fontWeight="bold">
                  {author?.name || author?.username}
                </Typography>
              </Paper>
            )}

            {/* Post Created Date Display */}
            {formattedDate && (
              <Typography variant="subtitle1" fontWeight="bold" color="text.primary" sx={{ ml: 0.5, color: "black" }}>
                {formattedDate}
              </Typography>
            )}
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton color="default">
              <MoreHorizIcon fontSize="medium" />
            </IconButton>
            <IconButton onClick={handleClose} color="default">
              <CloseIcon fontSize="medium" />
            </IconButton>
          </Box>
        </Box>

        {/* ================= MAIN CONTENT (GRID) ================= */}
        <Grid container spacing={2} sx={{ mb: 2 }}>
          {/* Picture Box */}
          <Grid item xs={12} sm={6}>
            <Paper
              variant="outlined"
              sx={{
                height: 220,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#f5f5f5',
                borderRadius: 2,
              }}
            >
              <Typography color="text.secondary" fontWeight={500}>
                Picture
              </Typography>
            </Paper>
          </Grid>

          {/* Title + Likes + Description Box */}
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', minWidth: 0 }}>
              
              {/* Title Header & Like Button Row */}
              <Box 
                sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between', 
                  mb: 1, 
                  width: '100%',
                  minWidth: 0 
                }}
              >
                {/* Title Box */}
                <Paper 
                  variant="outlined" 
                  sx={{ 
                    px: 2, 
                    py: 0.5, 
                    mr: 1,
                    flex: '1 1 auto', 
                    minWidth: 0 
                  }}
                >
                  <Typography id="post-expanded-title" variant="subtitle1" fontWeight="bold" noWrap>
                    {title}
                  </Typography>
                </Paper>

                {/* Likes Box */}
                <Box 
                  sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    flexShrink: 0, 
                    gap: 0.5 
                  }}
                >
                  <IconButton size="small" color="primary" sx={{ p: 0.5 }}>
                    <ThumbUpOutlinedIcon fontSize="small" />
                  </IconButton>
                  <Typography 
                    variant="body2" 
                    fontWeight="bold"
                    sx={{ color: '#000000', whiteSpace: 'nowrap' }}
                  >
                    {likesDisplay}
                  </Typography>
                </Box>
              </Box>

              {/* Description Container */}
              <Paper
                variant="outlined"
                sx={{
                  p: 2,
                  flexGrow: 1,
                  minHeight: 160,
                  maxHeight: 170,
                  overflowY: 'auto',
                  borderRadius: 2,
                }}
              >
                <Typography variant="body2" color="text.secondary">
                  {description}
                </Typography>
              </Paper>
            </Box>
          </Grid>
        </Grid>

        {/* ================= TAGS SECTION ================= */}
        <Paper variant="outlined" sx={{ p: 1.5, mb: 2, borderRadius: 2 }}>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', alignItems: 'center' }}>
            <Typography variant="caption" color="text.secondary" fontWeight="bold" sx={{ mr: 1 }}>
              TAGS:
            </Typography>
            {tags.map((tag) => (
              <Chip
                key={tag.id || tag.tagId || tag._id}
                label={tag.name}
                size="small"
                variant="outlined"
                sx={{
                  borderColor: tag.color || 'default',
                  color: tag.color || 'inherit',
                  fontWeight: 600,
                  fontSize: '0.75rem',
                }}
              />
            ))}
          </Box>
        </Paper>

        {/* ================= RESOURCES SECTION ================= */}
        <Paper variant="outlined" sx={{ p: 2, mb: 2, borderRadius: 2 }}>
          <Typography variant="subtitle2" fontWeight="bold" gutterBottom sx={{ textTransform: 'uppercase', letterSpacing: 0.5 }}>
            Resources & Information
          </Typography>

          <Grid container spacing={2} sx={{ mt: 0.5 }}>
            {/* Address */}
            {location?.address && (
              <Grid item xs={12} sm={6} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                <LocationOnIcon fontSize="small" color="action" />
                <Typography variant="body2" color="text.secondary">
                  {location.address}, {location.city}, {location.state} {location.zip}
                </Typography>
              </Grid>
            )}

            {/* Website Link */}
            {website && (
              <Grid item xs={12} sm={6} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <LanguageIcon fontSize="small" color="action" />
                <Link href={website} target="_blank" rel="noopener noreferrer" variant="body2" underline="hover">
                  {website}
                </Link>
              </Grid>
            )}

            {/* Hours of Operation */}
            {groupedSchedule.length > 0 && (
              <Grid item xs={12} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                <AccessTimeIcon fontSize="small" color="action" sx={{ mt: 0.3 }} />
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
                  {groupedSchedule.map((item, idx) => (
                    <Typography key={idx} variant="caption" color="text.secondary">
                      <strong>{item.dayLabel}:</strong> {item.timeText}
                    </Typography>
                  ))}
                </Box>
              </Grid>
            )}
          </Grid>
        </Paper>

        {/* ================= REVIEWS / COMMENTS SECTION ================= */}
        <Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
          <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
            Reviews & Comments ({comments.length})
          </Typography>

          {/* List Existing Comments */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, my: 1.5, maxHeight: 180, overflowY: 'auto' }}>
            {comments.length > 0 ? (
              comments.map((comment) => (
                <Box key={comment.id || comment._id} sx={{ bgcolor: '#f9f9f9', p: 1.5, borderRadius: 1.5 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                    <Typography variant="caption" fontWeight="bold">
                      {comment.author?.name || comment.authorUsername || 'User'}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {comment.createdAt ? new Date(comment.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : ''}
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.primary">
                    {comment.body}
                  </Typography>
                </Box>
              ))
            ) : (
              <Typography variant="caption" color="text.secondary">
                No comments yet. Be the first to leave one!
              </Typography>
            )}
          </Box>

          <Divider sx={{ my: 1 }} />

          {/* Add New Comment Field */}
          <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
            <TextField
              size="small"
              fullWidth
              placeholder="Write a comment or review..."
              variant="outlined"
            />
            <Button variant="contained" disableElevation size="small">
              Post
            </Button>
          </Box>
        </Paper>

      </Box>
    </Modal>
  );
}