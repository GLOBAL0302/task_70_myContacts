import './App.css';
import NavBar from './components/NavBar/NavBar';

import { Route, Routes } from 'react-router-dom';
import HomePage from './containers/HomePage/HomePage';
import ContactForm from './components/ContactForm/ContactForm';

const App = () => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/contactForm" element={<ContactForm />} />
      </Routes>
    </>
  );
};

export default App;
