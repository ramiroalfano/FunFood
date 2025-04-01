import React from 'react';  
import 'bootstrap/dist/css/bootstrap.min.css';  
import 'bootstrap/dist/js/bootstrap.bundle.min.js';  

// Importa la imagen de tu logo  
import logo from './LogoFun-Photoroom.png'; // Cambia la ruta según donde esté tu logo  

const Navbar = () => {  
  return (  
    <nav className="navbar navbar-expand-lg bg-body-tertiary">  
      <div className="container-fluid">  
        <a className="navbar-brand" href="/">  
          <img src={logo} alt="Logo" width="100" height="100" className="d-inline-block align-text-top" />   
          {/* Agrega imagen aquí */}  
        </a>  
        <button  
          className="navbar-toggler"  
          type="button"  
          data-bs-toggle="collapse"  
          data-bs-target="#navbarNavAltMarkup"  
          aria-controls="navbarNavAltMarkup"  
          aria-expanded="false"  
          aria-label="Alternar navegación"  
        >  
          <span className="navbar-toggler-icon"></span>  
        </button>  
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