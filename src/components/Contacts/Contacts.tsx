import Contact from './Contact';
import { Box } from '@mui/material';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectContacts } from '../../store/contactsSlice';
import { useEffect } from 'react';
import { fetchContacts } from '../../store/contactsThunks';

const Contacts = () => {
  const dispatch = useAppDispatch();
  const contacts = useAppSelector(selectContacts);
  console.log(contacts);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px', overflow: 'auto', height: '90vh' }}>
      {contacts.map((contact)=> (<Contact key={contact.id} contact={contact}/>))}
    </Box>
  );
};

export default Contacts;