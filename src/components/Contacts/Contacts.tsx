import Contact from './Contact';
import { Box, LinearProgress } from '@mui/material';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectContacts, selectFetchLoading } from '../../store/contactsSlice';
import { useEffect } from 'react';
import { fetchContacts } from '../../store/contactsThunks';
import { useParams } from 'react-router-dom';

const Contacts = () => {
  const dispatch = useAppDispatch();
  const fetchLoading = useAppSelector(selectFetchLoading)
  const { id } = useParams();
  const contacts = useAppSelector(selectContacts);
  useEffect(() => {
     try {
       dispatch(fetchContacts());
     }catch (e){
       throw e;
     }
  }, [dispatch, id]);

  return (
    <div>
      {fetchLoading && <LinearProgress />}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-around',
          flexWrap: 'wrap',
          gap: '10px',
          overflow: 'auto',
        }}
      >
        {contacts.map((contact) => (
          <Contact key={contact.id} contact={contact} />
        ))}
      </Box>
    </div>
  );
};

export default Contacts;
