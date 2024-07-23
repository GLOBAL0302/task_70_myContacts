import { Box, Paper, Typography } from '@mui/material';
import { IContactState } from '../../types';
import { } from '../../store/contactsSlice';
import { NavLink} from 'react-router-dom';



interface Props {
  contact:IContactState
}

const Contact:React.FC<Props> = ({contact}) => {

  return (
    <Paper elevation={6}>
      <NavLink
        style={{color:'black'}}
        to={`/contacts/${contact.id}`}>
        <Box
          component="div"
          className="d-flex align-items-center px-5"
          gap={4}>
          <img
            style={{ maxHeight: '100px', maxWidth: '100px' }}
            src={`${contact.photo}`}
            alt="contact_Photo"
          />
          <Typography variant="h5" component="h5">
            {contact.name}
          </Typography>
        </Box>
      </NavLink>
    </Paper>
  );
};

export default Contact;