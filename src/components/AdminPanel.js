import React, { useState, useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import { db, auth } from '../firebase-config';
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import './AdminPanel.css';

function AdminPanel() {
  const [formData, setFormData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  // Lista de UIDs de administradores
  const ADMIN_UIDS = [
    "AiMS1FYPrjdFWIA5i1kilUO41mj2", // Reemplaza esto con tu UID
    // Puedes agregar más UIDs de administradores aquí
  ];

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      console.log("Estado de autenticación cambiado:", user);
      setUser(user);
      if (user && ADMIN_UIDS.includes(user.uid)) {
        console.log("Usuario autorizado, cargando datos...");
        fetchFormData();
      } else if (user) {
        console.log("Usuario no autorizado:", user.uid);
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchFormData = () => {
    try {
      setLoading(true);
      const formsRef = ref(db, 'forms');
      
      onValue(formsRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const formsList = Object.entries(data).map(([id, form]) => ({
            id,
            ...form
          }));
          setFormData(formsList);
        } else {
          setFormData([]);
        }
        setLoading(false);
      }, (error) => {
        console.error("Error al obtener datos:", error);
        setError("Error al cargar los datos");
        setLoading(false);
      });
    } catch (err) {
      console.error("Error:", err);
      setError("Error al cargar los datos");
      setLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    try {
      console.log("Iniciando proceso de login...");
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      console.log("Login exitoso:", result.user.uid);
      
      if (!ADMIN_UIDS.includes(result.user.uid)) {
        console.log("Usuario no autorizado, cerrando sesión...");
        await signOut(auth);
        setError("No tienes permisos de administrador");
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      setError("Error al iniciar sesión");
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("Sesión cerrada exitosamente");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  if (!user) {
    return (
      <div className="admin-container">
        <h2>Panel de Administración</h2>
        <p>Por favor, inicia sesión como administrador</p>
        <button onClick={signInWithGoogle} className="admin-button">
          Iniciar sesión con Google
        </button>
      </div>
    );
  }

  if (!ADMIN_UIDS.includes(user.uid)) {
    return (
      <div className="admin-container">
        <h2>Acceso Denegado</h2>
        <p>No tienes permisos de administrador</p>
        <p>Tu UID: {user.uid}</p>
        <button onClick={handleLogout} className="admin-button">
          Cerrar sesión
        </button>
      </div>
    );
  }

  if (loading) {
    return <div className="admin-container">Cargando datos...</div>;
  }

  if (error) {
    return (
      <div className="admin-container">
        <div className="error-message">{error}</div>
        <button onClick={handleLogout} className="admin-button">
          Cerrar sesión
        </button>
      </div>
    );
  }

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h2>Panel de Administración</h2>
        <div className="admin-user-info">
          <span>Bienvenido, {user.displayName}</span>
          <button onClick={handleLogout} className="admin-button">
            Cerrar sesión
          </button>
        </div>
      </div>

      <div className="forms-list">
        <h3>Formularios Enviados ({formData.length})</h3>
        {formData.length === 0 ? (
          <p>No hay formularios registrados</p>
        ) : (
          <div className="forms-grid">
            {formData.map((form) => (
              <div key={form.id} className="form-card">
                <h4>Formulario #{form.id}</h4>
                <div className="form-details">
                  <p><strong>Nombre:</strong> {form.nombre}</p>
                  <p><strong>Apellido:</strong> {form.apellido}</p>
                  <p><strong>Teléfono:</strong> {form.tel}</p>
                  <p><strong>Curso:</strong> {form.curso}</p>
                  <p><strong>Mensaje:</strong> {form.mensaje}</p>
                  <p><strong>Fecha:</strong> {new Date(form.createdAt).toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminPanel; 