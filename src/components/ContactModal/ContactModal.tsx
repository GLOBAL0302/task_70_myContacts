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
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useNavigate, useParams } from 'react-router-dom';
import { deleteContactThunk } from '../../store/contactsThunks';
import { selectContacts } from '../../store/contactsSlice';
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ContactModal:React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch()
  const {id} = useParams();
  const selectedContact = useAppSelector(selectContacts).find((contact) => contact.id === id);

  const handleClose = () => {
    navigate("/")
  };

  const editContact= ()=>{
    navigate(`/editForm/${id}`)
  }

  const deleteContact= async ()=>{
    if(id){
      await dispatch(deleteContactThunk(id))
    }
    navigate("/")
  }


  return (
    <div>
      <Dialog
        open={true}
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
                  {selectedContact && selectedContact.name}
                </DialogContentText>
              </Grid>
              <Grid item sx={{display: 'flex', justifyContent: 'space-between'}}>
                <LocalPhone className="me-3" />
                <DialogContentText id="alert-dialog-slide-description">
                  {selectedContact && selectedContact.phone}
                </DialogContentText>
              </Grid>
              <Grid item sx={{display: 'flex', justifyContent: 'space-between'}}>
                <AlternateEmail className="me-3" />
                <DialogContentText id="alert-dialog-slide-description">
                  {selectedContact && selectedContact.email}
                </DialogContentText>
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={()=>editContact()} color="success">Edit</Button>
          <Button variant="outlined"  color="error" onClick={()=>deleteContact()}>Delete</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ContactModal;