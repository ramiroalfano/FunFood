import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase/FirebaseConfig';
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import logo from './LogoFun-Photoroom.png';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      navigate('/protected');
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img 
            src={logo} 
            alt="Logo" 
            width="100" 
            height="100" 
            className="d-inline-block align-text-top" 
          />
        </Link>
        <div className="d-flex align-items-center">
          <div className="navbar-nav d-flex align-items-center">
            <Link className="nav-link d-flex align-items-center" to="/">Inicio</Link>
            <Link className="nav-link d-flex align-items-center" to="/ShoppingCart">Compras</Link>
            {user ? (
              <>
                <Link className="nav-link d-flex align-items-center" to="/protected">Mi Perfil</Link>
                <Link className="nav-link d-flex align-items-center" to="/admin">Panel de Administración</Link>
                <button 
                  className="nav-link btn btn-link d-flex align-items-center" 
                  onClick={handleLogout}
                >
                  Cerrar Sesión
                </button>
              </>
            ) : (
              <button 
                className="nav-link btn btn-link d-flex align-items-center" 
                onClick={handleLogin}
              >
                Iniciar Sesión
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
