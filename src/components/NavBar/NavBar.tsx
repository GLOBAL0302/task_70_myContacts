import { NavLink } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-3">
      <div className="container-fluid">
        <NavLink to="/" className="navbar-brand">
          My Contacts
        </NavLink>
        <div className="d-flex ms-auto">
          <div className="navbar-nav">
            <NavLink to="/contactForm" className="nav-link">
              Add Contacts
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
