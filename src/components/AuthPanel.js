import React, { useState, useEffect } from 'react';
import { GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase-config';
import AdminPanel from './AdminPanel';
import { useNavigate } from 'react-router-dom';

// --- UID del dueño ---
// Reemplaza esto con el UID real de la cuenta de Google que usará el dueño
const DUENO_UID = "--- PEGA_AQUÍ_EL_UID_REAL_DEL_DUEÑO ---"; // <-- ¡IMPORTANTE!
// ---------------------

function AuthPanel() {
  const [user, setUser] = useState(null);
  const [isDueno, setIsDueno] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("AuthPanel montado - Iniciando listener de auth");
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("Auth state changed:", currentUser);
      setUser(currentUser);
      const isAdmin = currentUser && currentUser.uid === DUENO_UID;
      setIsDueno(isAdmin);
      
      // Si el usuario no es admin, redirigir al formulario
      if (currentUser && !isAdmin) {
        navigate('/Form');
      }
    });

    return () => {
      console.log("AuthPanel desmontado - Limpiando listener");
      unsubscribe();
    };
  }, [navigate]);

  const signInWithGoogle = async () => {
    console.log("Iniciando proceso de login...");
    const provider = new GoogleAuthProvider();
    
    try {
      console.log("Intentando abrir popup de Google...");
      const result = await signInWithPopup(auth, provider);
      console.log("Login exitoso:", result);
      
      // Verificar si el usuario es admin
      if (result.user.uid !== DUENO_UID) {
        await signOut(auth);
        setError("Esta página es solo para administradores. Por favor, use el formulario público.");
        navigate('/Form');
      }
    } catch (error) {
      console.error("Error completo:", error);
      setError(error.message);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("Logout exitoso");
      navigate('/Form');
    } catch (error) {
      console.error("Error en logout:", error);
      setError(error.message);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Panel de Administración</h2>
      
      {error && (
        <div style={{ 
          color: 'red', 
          margin: '10px 0', 
          padding: '10px', 
          border: '1px solid red', 
          borderRadius: '4px',
          backgroundColor: '#ffebee'
        }}>
          Error: {error}
        </div>
      )}

      {user ? (
        <div>
          <div style={{ marginBottom: '20px' }}>
            <p>¡Bienvenido, {user.displayName || user.email}!</p>
            <button 
              onClick={handleLogout}
              style={{
                padding: '10px 20px',
                backgroundColor: '#dc3545',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Cerrar Sesión
            </button>
          </div>
          
          <AdminPanel />
        </div>
      ) : (
        <div>
          <p>Esta es una página exclusiva para administradores.</p>
          <p>Si eres administrador, inicia sesión con tu cuenta de Google.</p>
          <button 
            onClick={signInWithGoogle}
            style={{
              padding: '10px 20px',
              backgroundColor: '#4285f4',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}
          >
            <img 
              src="https://www.google.com/favicon.ico" 
              alt="Google" 
              style={{ width: '20px', height: '20px' }}
            />
            Iniciar Sesión con Google
          </button>
        </div>
      )}
    </div>
  );
}

export default AuthPanel; 