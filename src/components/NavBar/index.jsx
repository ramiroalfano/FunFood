import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


import logo from './LogoFun-Photoroom.png';

const Navbar = () => {
  const buttonStyle = {
    width: '40px',   
    height: '40px',       
    padding: '0.125rem',   
    flex: '0 0 auto'        
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid flex-column flex-lg-row">
        <div className="d-flex w-100 justify-content-between align-items-center">
          <a className="navbar-brand" href="/">
            <img 
              src={logo} 
              alt="Logo" 
              width="100" 
              height="100" 
              className="d-inline-block align-text-top" 
            />
          </a>
          <button
            className="navbar-toggler"
            style={buttonStyle}
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Alternar navegación"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>
        {/* Menú colapsable */}
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <a className="nav-link active" aria-current="page" href="/">Inicio</a>
            <a className="nav-link" href="#">Características</a>
            <a className="nav-link" href="#">Precios</a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
