import { Box, Button, CircularProgress, Grid, TextField, Typography } from '@mui/material';
import BadgeIcon from '@mui/icons-material/Badge';
import { AlternateEmail, CameraAlt, LocalPhone } from '@mui/icons-material';
import {useState } from 'react';
import { IUserInput } from '../../types';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { editContactThunk, submitContact } from '../../store/contactsThunks';
import { useNavigate, useParams } from 'react-router-dom';
import { selectContacts, selectCreateLoading } from '../../store/contactsSlice';

const ContactForm = () => {
  let initialState: IUserInput = {
    name: '',
    phone: '',
    email: '',
    photo: '',
  };
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const contacts = useAppSelector(selectContacts);
  const createLoading = useAppSelector(selectCreateLoading);
  const { id: userId } = useParams();
  if (userId) {
    const selectedContact = contacts.find((item) => item.id === userId);
    if (selectedContact && userId) {
      initialState = {
        name: selectedContact.name,
        phone: selectedContact.phone,
        email: selectedContact.email,
        photo: selectedContact.photo,
      };
    }
  }
  const [contactForm, setContactForm] = useState<IUserInput>(initialState);

  const onChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setContactForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };


  const onFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      if (userId) {
        await dispatch(editContactThunk({ ...contactForm, id: userId }));
      } else {
        await dispatch(submitContact(contactForm));
      }
    } catch (e) {
      console.log('The mistake is ', e);
    } finally {
      navigate('/');
    }
  };

  return (
    <>
      <Grid
        onSubmit={onFormSubmit}
        container
        component="form"
        direction="column"
        gap={2}
        sx={{ bgcolor: 'text.disabled', padding: 2 }}
      >
        <Grid>
          <Typography variant="h5" component="h3">
            {userId ? 'Edit Contact' : 'Add New Contact'}
          </Typography>
          <hr />
        </Grid>
        <Grid item>
          <Box component="div" className="d-flex align-items-center">
            <BadgeIcon className="me-3" />
            <TextField
              value={contactForm.name}
              fullWidth
              required
              onChange={onChange}
              name="name"
              label="Name"
              variant="filled"
              color={'success'}
            ></TextField>
          </Box>
        </Grid>
        <Grid item>
          <Box component="div" className="d-flex align-items-center">
            <LocalPhone className="me-3" />
            <TextField
              value={contactForm.phone}
              fullWidth
              required
              onChange={onChange}
              name="phone"
              label="Phone"
              variant="filled"
              color={'success'}
            ></TextField>
          </Box>
        </Grid>
        <Grid item>
          <Box component="div" className="d-flex align-items-center">
            <AlternateEmail className="me-3" />
            <TextField
              value={contactForm.email}
              fullWidth
              required
              onChange={onChange}
              name="email"
              label="Email"
              variant="filled"
              color={'success'}
            ></TextField>
          </Box>
        </Grid>
        <Grid item>
          <Box component="div" className="d-flex align-items-center">
            <CameraAlt className="me-3" />
            <TextField
              fullWidth
              onChange={onChange}
              name="photo"
              label="Photo"
              variant="filled"
              color={'success'}
            ></TextField>
          </Box>
        </Grid>
        <Grid item sx={{ textAlign: 'center' }}>
          <Typography variant="h5" component="p" marginBottom={1}>
            <span className="border-1 border-bottom">Photo preview</span>
          </Typography>
          <img
            style={{ maxHeight: '200px', maxWidth: '200px' }}
            src={`${contactForm.photo}`}
            alt=""
          />
        </Grid>
        <Grid item className="ms-auto d-flex gap-5">
          <Button
            disabled={createLoading}
            type="submit"
            color={userId ? 'warning' : 'success'}
            variant="contained"
          >
            {createLoading && <CircularProgress color="inherit"/>}
            {userId ? 'Save Changes' : 'Create Contact'}
          </Button>
          <Button
            onClick={()=> navigate("/")}
            type="button" color="inherit" variant="contained">
            Back to Contacts
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default ContactForm;
