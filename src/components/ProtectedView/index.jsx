import React from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase/FirebaseConfig';
import './style.css';

const ProtectedView = () => {
  const navigate = useNavigate();
  const user = auth.currentUser;

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate('/');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  if (!user) {
    return (
      <div className="protected-container">
        <h1>Acceso Denegado</h1>
        <p>Por favor, inicia sesión para acceder a esta página.</p>
        <button onClick={() => navigate('/')}>Volver al inicio</button>
      </div>
    );
  }

  return (
    <div className="protected-container">
      <h1>Bienvenido, {user.displayName}</h1>
      <div className="user-info">
        <img src={user.photoURL} alt="Foto de perfil" className="profile-picture" />
        <p>Email: {user.email}</p>
      </div>
      <button onClick={handleLogout} className="logout-button">
        Cerrar Sesión
      </button>
    </div>
  );
};

export default ProtectedView; 