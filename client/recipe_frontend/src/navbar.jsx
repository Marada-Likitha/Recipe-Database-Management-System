// NavBar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <div className="navbar-nav">
          <Link to="/Home" className="nav-item nav-link">Home</Link>
          <Link to="/Add" className="nav-item nav-link">Add</Link>
          {/* <Link to="/Update" className="nav-item nav-link">Update</Link>
          <Link to="/Delete" className="nav-item nav-link">Delete</Link> */}
          </div>
      </div>
    </nav>
  );
}

export default NavBar;
