import Contact from './Contact';
import { Box } from '@mui/material';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {selectContacts } from '../../store/contactsSlice';
import { useEffect } from 'react';
import { fetchContacts } from '../../store/contactsThunks';
import { useParams } from 'react-router-dom';


const Contacts = () => {
  const dispatch = useAppDispatch();
  const {id} = useParams()
  const contacts = useAppSelector(selectContacts);
  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch, id]);

  return (
    <div>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px', overflow: 'auto', height: '90vh' }}>
        {contacts.map((contact) => (<Contact key={contact.id} contact={contact} />))}
      </Box>
    </div>
  );
};

export default Contacts;