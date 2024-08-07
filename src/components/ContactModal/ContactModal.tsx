import { TransitionProps } from '@mui/material/transitions';
import CloseIcon from '@mui/icons-material/Close';
import React from 'react';
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Slide,
} from '@mui/material';
import BadgeIcon from '@mui/icons-material/Badge';
import { AlternateEmail, LocalPhone } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useNavigate, useParams } from 'react-router-dom';
import { deleteContactThunk } from '../../store/contactsThunks';
import { selectContacts, selectDeleteLoading } from '../../store/contactsSlice';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const ContactModal: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const selectedContact = useAppSelector(selectContacts).find(
    (contact) => contact.id === id,
  );
  const deleteLoading = useAppSelector(selectDeleteLoading);

  const handleClose = () => {
    navigate('/');
  };

  const editContact = () => {
    navigate(`/editForm/${id}`);
  };

  const deleteContact = async () => {
    try {
      if (id) {
        await dispatch(deleteContactThunk(id));
      }
    } catch (error) {
      throw error;
    } finally {
      navigate('/');
    }
  };

  return (
    <div>
      <Dialog
        open={true}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <Box
          component="div"
          sx={{
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
          }}
        >
          <DialogTitle>{'Contact Information'}</DialogTitle>
          <CloseIcon
            onClick={() => {
              navigate('/');
            }}
          />
        </Box>
        <hr />
        <DialogContent className="px-5 py-0">
          <Box component="div" className="d-flex gap-5 align-items-center">
            <img
              className="border border-5 p-2"
              style={{ maxHeight: '150px', maxWidth: '200px' }}
              src={`${selectedContact && selectedContact.photo}`}
              alt="contactPic"
            />
            <Grid container spacing={1} direction="column">
              <Grid
                item
                sx={{ display: 'flex', justifyContent: 'space-between' }}
              >
                <BadgeIcon className="me-3" />
                <DialogContentText id="alert-dialog-slide-description">
                  {selectedContact && selectedContact.name}
                </DialogContentText>
              </Grid>
              <Grid
                item
                sx={{ display: 'flex', justifyContent: 'space-between' }}
              >
                <LocalPhone className="me-3" />
                <DialogContentText id="alert-dialog-slide-description">
                  {selectedContact && selectedContact.phone}
                </DialogContentText>
              </Grid>
              <Grid
                item
                sx={{ display: 'flex', justifyContent: 'space-between' }}
              >
                <AlternateEmail className="me-3" />
                <DialogContentText id="alert-dialog-slide-description">
                  {selectedContact && selectedContact.email}
                </DialogContentText>
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            onClick={() => editContact()}
            color="success"
          >
            Edit
          </Button>
          <Button
            disabled={deleteLoading}
            variant="outlined"
            color="error"
            onClick={() => deleteContact()}
          >
            {deleteLoading && <CircularProgress color="error" />}Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ContactModal;
