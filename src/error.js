import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Link } from 'react-router-dom';

const style = {
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

const BasicModal=()=> {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  return (
   
    <div>
      
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
                  sx={{ textAlign: 'center' }}
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style}>
                    {/* <ErrorIcon sx={{ width: '20vw', height: '20vh' }} /> */}
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                      ,אינך מחובר <br />
                      עליך להתחבר
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                      <Link to={'signIn'} variant="body2">
                        להתחברות
                      </Link>
                    </Typography>
                  </Box>
                </Modal>
    </div>
  );
}
export default BasicModal