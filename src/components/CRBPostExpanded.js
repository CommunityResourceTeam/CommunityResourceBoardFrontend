import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import CRBTagSelect from './CRBTagSelect';

const style = {
  color: 'black',
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 1000,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function PostExpandedDetails() {
  return (
    <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Title
        </Typography>
        
        <Typography>
          Image
        </Typography>

        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Description yapping yapping yapping yapping yapping yapping yapping yapping yapping yapping yapping yapping yapping yapping yapping yapping yapping yapping yapping yapping yapping 
        </Typography>

        <CRBTagSelect />

        <Typography>
          Resources
        </Typography>

        <Typography>
          Comments
        </Typography>
    </Box>
  );
}

export default function CRBPostExpanded() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <PostExpandedDetails />
      </Modal>
    </div>
  );
}
