import './App.css';
import NavBar from './components/NavBar/NavBar';

import { Route, Routes } from 'react-router-dom';
import HomePage from './containers/HomePage/HomePage';
import ContactForm from './components/ContactForm/ContactForm';
import NotFoundPage from './components/NotFoundPage/NotFoundPage';
import ContactModal from './components/ContactModal/ContactModal';


const App = () => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />}>
          <Route path="/contacts/:id" element={<ContactModal/>}/>
        </Route>
        <Route path="/contactForm" element={<ContactForm />}/>
        <Route path="/editForm/:id" element={<ContactForm/>}/>
        <Route path="/*" element={<NotFoundPage/>}/>
      </Routes>
    </>
  );
};

export default App;
