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

// Color Palette Constants
const COLORS = {
  background: '#FFFEF0', // Ivory
  primary: '#ED9C40',    // Golden Apricot
  secondary: '#FAB2EA',  // Blush Pop
  darkText: '#333333',
};

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
  bgcolor: COLORS.background,
  borderRadius: 4,
  border: `2px solid ${COLORS.primary}`,
  boxShadow: '0px 10px 25px rgba(237, 156, 64, 0.25)',
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
    imageUrl,
    image,
    location,
    hours,
    website,
    tags = [],
    comments = [],
  } = post;

  const displayImage = imageUrl || image;

  // Extract likes count safely
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
            <Avatar sx={{ width: 40, height: 40, bgcolor: COLORS.primary, color: '#FFFFFF', fontWeight: 'bold' }}>
              {author?.name ? author.name.charAt(0).toUpperCase() : '?'}
            </Avatar>

            {/* Author Badge */}
            {(author?.name || author?.username) && (
              <Paper 
                variant="outlined" 
                sx={{ 
                  px: 1.5, 
                  py: 0.5, 
                  borderRadius: 2, 
                  bgcolor: '#FFFFFF',
                  borderColor: COLORS.secondary 
                }}
              >
                <Typography variant="body2" fontWeight="bold" sx={{ color: COLORS.darkText }}>
                  {author?.name || author?.username}
                </Typography>
              </Paper>
            )}

            {/* Created Date */}
            {formattedDate && (
              <Typography variant="subtitle1" fontWeight="bold" sx={{ ml: 0.5, color: COLORS.darkText }}>
                {formattedDate}
              </Typography>
            )}
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton color="default">
              <MoreHorizIcon fontSize="medium" sx={{ color: COLORS.darkText }} />
            </IconButton>
            <IconButton onClick={handleClose} color="default">
              <CloseIcon fontSize="medium" sx={{ color: COLORS.darkText }} />
            </IconButton>
          </Box>
        </Box>

        {/* ================= MAIN CONTENT (GRID) ================= */}
        <Grid container spacing={2} sx={{ mb: 2 }}>
          {/* Picture Box */}
          <Grid size={{ xs: 12, sm: 6 }}>
            <Paper
              elevation={0}
              sx={{
                height: 220,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#FFFFFF',
                borderRadius: 3,
                border: `1px solid ${COLORS.secondary}`,
                overflow: 'hidden'
              }}
            >
              {displayImage ? (
                <Box
                  component="img"
                  src={displayImage}
                  alt={title}
                  sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
              ) : (
                <Typography color="text.secondary" fontWeight={500}>
                  No Image Available
                </Typography>
              )}
            </Paper>
          </Grid>

          {/* Title + Likes + Description Box */}
          <Grid size={{ xs: 12, sm: 6 }}>
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
                  elevation={0}
                  sx={{ 
                    px: 2, 
                    py: 0.5, 
                    mr: 1,
                    flex: '1 1 auto', 
                    minWidth: 0,
                    bgcolor: '#FFFFFF',
                    border: `1px solid ${COLORS.primary}`,
                    borderRadius: 2
                  }}
                >
                  <Typography id="post-expanded-title" variant="subtitle1" fontWeight="bold" noWrap sx={{ color: COLORS.primary }}>
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
                  <IconButton size="small" sx={{ p: 0.5, color: COLORS.primary }}>
                    <ThumbUpOutlinedIcon fontSize="small" />
                  </IconButton>
                  <Typography 
                    variant="body2" 
                    fontWeight="bold"
                    sx={{ color: COLORS.darkText, whiteSpace: 'nowrap' }}
                  >
                    {likesDisplay}
                  </Typography>
                </Box>
              </Box>

              {/* Description Container */}
              <Paper
                elevation={0}
                sx={{
                  p: 2,
                  flexGrow: 1,
                  minHeight: 160,
                  maxHeight: 170,
                  overflowY: 'auto',
                  borderRadius: 3,
                  bgcolor: '#FFFFFF',
                  border: `1px solid ${COLORS.secondary}`
                }}
              >
                <Typography variant="body2" sx={{ color: COLORS.darkText }}>
                  {description}
                </Typography>
              </Paper>
            </Box>
          </Grid>
        </Grid>

        {/* ================= TAGS SECTION ================= */}
        <Paper elevation={0} sx={{ p: 1.5, mb: 2, borderRadius: 3, bgcolor: '#FFFFFF', border: `1px solid ${COLORS.secondary}` }}>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', alignItems: 'center' }}>
            <Typography variant="caption" color="text.secondary" fontWeight="bold" sx={{ mr: 1 }}>
              TAGS:
            </Typography>
            {tags.map((tag) => (
              <Chip
                key={tag.id || tag.tagId || tag._id}
                label={tag.name}
                size="small"
                sx={{
                  bgcolor: COLORS.secondary,
                  color: COLORS.darkText,
                  fontWeight: 600,
                  fontSize: '0.75rem',
                  border: 'none'
                }}
              />
            ))}
          </Box>
        </Paper>

        {/* ================= RESOURCES SECTION ================= */}
        <Paper elevation={0} sx={{ p: 2, mb: 2, borderRadius: 3, bgcolor: '#FFFFFF', border: `1px solid ${COLORS.secondary}` }}>
          <Typography variant="subtitle2" fontWeight="bold" gutterBottom sx={{ textTransform: 'uppercase', letterSpacing: 0.5, color: COLORS.primary }}>
            Resources & Information
          </Typography>

          <Grid container spacing={2} sx={{ mt: 0.5 }}>
            {/* Address */}
            {location?.address && (
              <Grid size={{ xs: 12, sm: 6 }} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                <LocationOnIcon fontSize="small" sx={{ color: COLORS.primary }} />
                <Typography variant="body2" sx={{ color: COLORS.darkText }}>
                  {location.address}, {location.city}, {location.state} {location.zip}
                </Typography>
              </Grid>
            )}

            {/* Website Link */}
            {website && (
              <Grid size={{ xs: 12, sm: 6 }} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <LanguageIcon fontSize="small" sx={{ color: COLORS.primary }} />
                <Link href={website} target="_blank" rel="noopener noreferrer" variant="body2" underline="hover" sx={{ color: COLORS.primary, fontWeight: 'bold' }}>
                  {website}
                </Link>
              </Grid>
            )}

            {/* Hours of Operation */}
            {groupedSchedule.length > 0 && (
              <Grid size={{ xs: 12 }} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                <AccessTimeIcon fontSize="small" sx={{ color: COLORS.primary, mt: 0.3 }} />
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
                  {groupedSchedule.map((item, idx) => (
                    <Typography key={idx} variant="caption" sx={{ color: COLORS.darkText }}>
                      <strong>{item.dayLabel}:</strong> {item.timeText}
                    </Typography>
                  ))}
                </Box>
              </Grid>
            )}
          </Grid>
        </Paper>

        {/* ================= REVIEWS / COMMENTS SECTION ================= */}
        <Paper elevation={0} sx={{ p: 2, borderRadius: 3, bgcolor: '#FFFFFF', border: `1px solid ${COLORS.secondary}` }}>
          <Typography variant="subtitle2" fontWeight="bold" gutterBottom sx={{ color: COLORS.primary }}>
            Reviews & Comments ({comments.length})
          </Typography>

          {/* List Existing Comments */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, my: 1.5, maxHeight: 180, overflowY: 'auto' }}>
            {comments.length > 0 ? (
              comments.map((comment) => (
                <Box key={comment.id || comment._id} sx={{ bgcolor: COLORS.background, p: 1.5, borderRadius: 2, border: `1px solid ${COLORS.secondary}` }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                    <Typography variant="caption" fontWeight="bold" sx={{ color: COLORS.primary }}>
                      {comment.author?.name || comment.authorUsername || 'User'}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {comment.createdAt ? new Date(comment.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : ''}
                    </Typography>
                  </Box>
                  <Typography variant="body2" sx={{ color: COLORS.darkText }}>
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
          <Box sx={{ display: 'flex', gap: 1, mt: 1.5 }}>
            <TextField
              size="small"
              fullWidth
              placeholder="Write a comment or review..."
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  '& fieldset': { borderColor: COLORS.secondary },
                  '&:hover fieldset': { borderColor: COLORS.primary },
                  '&.Mui-focused fieldset': { borderColor: COLORS.primary },
                }
              }}
            />
            <Button 
              variant="contained" 
              disableElevation 
              size="small"
              sx={{ 
                bgcolor: COLORS.primary, 
                color: '#FFFFFF', 
                fontWeight: 'bold', 
                borderRadius: 2,
                px: 2,
                '&:hover': { bgcolor: '#d8872e' }
              }}
            >
              Post
            </Button>
          </Box>
        </Paper>

      </Box>
    </Modal>
  );
}