import Contact from './Contact';
import { Box } from '@mui/material';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectContact, selectContacts } from '../../store/contactsSlice';
import { useEffect } from 'react';
import { fetchContacts } from '../../store/contactsThunks';
import ContactModal from '../ContactModal/ContactModal';


const Contacts = () => {
  const dispatch = useAppDispatch();
  const contacts = useAppSelector(selectContacts);
  const selectedContact = useAppSelector(selectContact);
  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px', overflow: 'auto', height: '90vh' }}>
        {contacts.map((contact) => (<Contact key={contact.id} contact={contact} />))}
      </Box>
      {selectedContact.name ? (<div className="modal d-block" >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Contact</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body d-flex  justify-content-between align-items-center">
              <img src="" alt="contactPic" />
              <div>
                <h4>Name</h4>
                <p>Phone</p>
                <p>email</p>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary" data-bs-dismiss="modal">Edit</button>
              <button type="button" className="btn btn-danger">Delete</button>
            </div>
          </div>
        </div>
      </div>): ""}
     <ContactModal />

    </div>
  );
};

export default Contacts;