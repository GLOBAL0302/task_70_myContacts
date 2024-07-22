import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import BadgeIcon from '@mui/icons-material/Badge';
import { AlternateEmail, CameraAlt, LocalPhone } from '@mui/icons-material';
import { useState } from 'react';
import { IUserInput } from '../../types';
import { useAppDispatch } from '../../app/hooks';
import { submitContact } from '../../store/contactsThunks';

const initialState: IUserInput = {
  name: '',
  phone: '',
  email: '',
  photo: '',
};

const ContactForm = () => {
  const dispatch = useAppDispatch();

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
      await dispatch(submitContact(contactForm))
    }catch (e){
      console.log("The mistake is ", e);
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
        sx={{ bgcolor: 'text.disabled', padding: 4 }}
      >
        <Grid>
          <Typography variant="h5" component="h3">
            Add new contacts
          </Typography>
          <hr />
        </Grid>
        <Grid item>
          <Box component="div" className="d-flex align-items-center">
            <BadgeIcon className="me-3" />
            <TextField
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
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfHDhRGTty4JUK8TuWxxrGMdy7awUBC4LY0w&s"
            alt=""
          />
        </Grid>
        <Grid item className="ms-auto d-flex gap-5">
          <Button type="submit" color="success" variant="contained">
            Add New Contact
          </Button>
          <Button type="button" color="primary" variant="contained">
            Back to Contacts
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default ContactForm;
