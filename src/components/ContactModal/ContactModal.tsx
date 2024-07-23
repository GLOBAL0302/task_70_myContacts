import { TransitionProps } from '@mui/material/transitions';
import React from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle, Grid,
  Slide,
} from '@mui/material';
import BadgeIcon from '@mui/icons-material/Badge';
import { AlternateEmail, LocalPhone } from '@mui/icons-material';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ContactModal = () => {

  const [open, setOpen] = React.useState(true);

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      {/*<Button variant="outlined" onClick={handleClickOpen}>*/}
      {/*  Slide in alert dialog*/}
      {/*</Button>*/}
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{'Contact Information'}</DialogTitle>
        <DialogContent>
          <Box component="div" className="d-flex gap-5 align-items-center">
            <img
              className="border border-5 p-2"
              style={{ maxHeight: '200px', maxWidth: '200px' }}
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfHDhRGTty4JUK8TuWxxrGMdy7awUBC4LY0w&s"
              alt="contactPic" />
            <Grid container spacing={1} direction="column">
              <Grid item sx={{display: 'flex', justifyContent: 'space-between'}}>
                <BadgeIcon className="me-3" />
                <DialogContentText id="alert-dialog-slide-description">
                  name
                </DialogContentText>
              </Grid>
              <Grid item sx={{display: 'flex', justifyContent: 'space-between'}}>
                <LocalPhone className="me-3" />
                <DialogContentText id="alert-dialog-slide-description">
                  phone
                </DialogContentText>
              </Grid>
              <Grid item sx={{display: 'flex', justifyContent: 'space-between'}}>
                <AlternateEmail className="me-3" />
                <DialogContentText id="alert-dialog-slide-description">
                  Email
                </DialogContentText>
              </Grid>
            </Grid>
          </Box>

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Edit</Button>
          <Button onClick={handleClose}>Delete</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ContactModal;