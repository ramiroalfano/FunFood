import React, { useState, useEffect } from 'react';
import { auth, firestoreDb } from './firebase/FirebaseConfig';
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import './AdminPanel.css';

function AdminMenu() {
  const [menuData, setMenuData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [newMenuItem, setNewMenuItem] = useState({
    day: 'Lunes',
    food: '',
    stock: ''
  });
  const [editingMenuItem, setEditingMenuItem] = useState(null);

  const ADMIN_UIDS = [
    "AiMS1FYPrjdFWIA5i1kilUO41mj2", // Reemplaza esto con tu UID
  ];

  const DAYS = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      console.log("Estado de autenticación cambiado:", user);
      setUser(user);
      if (user) {
        console.log("Usuario autenticado:", user.uid);
        console.log("¿Es admin?:", ADMIN_UIDS.includes(user.uid));
        fetchMenuData();
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchMenuData = async () => {
    try {
      console.log("Intentando obtener datos del menú...");
      const menuRef = collection(firestoreDb, 'card');
      const snapshot = await getDocs(menuRef);
      const menu = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      console.log("Datos obtenidos:", menu);
      setMenuData(menu);
    } catch (err) {
      console.error("Error al obtener menú:", err);
      setError("Error al cargar el menú. Por favor, intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddMenuItem = async (e) => {
    e.preventDefault();
    try {
      console.log("Intentando agregar nuevo ítem...");
      console.log("Usuario actual:", user);
      console.log("¿Es admin?:", ADMIN_UIDS.includes(user?.uid));

      if (!user) {
        throw new Error("Debes iniciar sesión para agregar ítems");
      }

      const menuRef = collection(firestoreDb, 'card');
      const stockValue = parseInt(newMenuItem.stock) || 0;
      
      const newItem = {
        ...newMenuItem,
        stock: stockValue,
        createdAt: new Date().toISOString(),
        createdBy: user.uid
      };

      console.log("Datos a guardar:", newItem);
      
      const docRef = await addDoc(menuRef, newItem);
      console.log("Documento creado con ID:", docRef.id);

      setNewMenuItem({
        day: 'Lunes',
        food: '',
        stock: ''
      });
      fetchMenuData();
    } catch (err) {
      console.error("Error detallado al agregar ítem:", err);
      setError(`Error al agregar el ítem: ${err.message}`);
    }
  };

  const handleUpdateMenuItem = async (e) => {
    e.preventDefault();
    try {
      if (!user) {
        throw new Error("Debes iniciar sesión para actualizar ítems");
      }

      const menuRef = doc(firestoreDb, 'card', editingMenuItem.id);
      const stockValue = parseInt(editingMenuItem.stock) || 0;

      const updatedItem = {
        ...editingMenuItem,
        stock: stockValue,
        updatedAt: new Date().toISOString(),
        updatedBy: user.uid
      };

      console.log("Actualizando ítem:", updatedItem);
      
      await updateDoc(menuRef, updatedItem);
      console.log("Ítem actualizado exitosamente");
      
      setEditingMenuItem(null);
      fetchMenuData();
    } catch (err) {
      console.error("Error al actualizar ítem:", err);
      setError(`Error al actualizar el ítem: ${err.message}`);
    }
  };

  const handleDeleteMenuItem = async (itemId) => {
    if (!user) {
      setError("Debes iniciar sesión para eliminar ítems");
      return;
    }

    if (window.confirm('¿Estás seguro de que quieres eliminar este ítem?')) {
      try {
        console.log("Intentando eliminar ítem:", itemId);
        const menuRef = doc(firestoreDb, 'card', itemId);
        await deleteDoc(menuRef);
        console.log("Ítem eliminado exitosamente");
        fetchMenuData();
      } catch (err) {
        console.error("Error al eliminar ítem:", err);
        setError(`Error al eliminar el ítem: ${err.message}`);
      }
    }
  };

  const handleStockChange = (e, isEditing = false) => {
    const value = e.target.value;
    if (value === '' || /^\d+$/.test(value)) {
      if (isEditing) {
        setEditingMenuItem({...editingMenuItem, stock: value});
      } else {
        setNewMenuItem({...newMenuItem, stock: value});
      }
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
      setError("Error al iniciar sesión. Por favor, intenta nuevamente.");
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("Sesión cerrada exitosamente");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      setError("Error al cerrar sesión. Por favor, intenta nuevamente.");
    }
  };

  if (!user) {
    return (
      <div className="admin-container">
        <h2>Administración del Menú</h2>
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

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h2>Administración del Menú Semanal</h2>
        <div className="admin-user-info">
          <span>Bienvenido, {user?.displayName}</span>
          <button onClick={handleLogout} className="admin-button">
            Cerrar sesión
          </button>
        </div>
      </div>

      <div className="admin-navigation">
        <button 
          className="admin-button"
          onClick={() => window.location.href = '/admin'}
        >
          Volver al Panel de Administración
        </button>
      </div>

      {error && (
        <div className="error-message">
          <p>{error}</p>
          <button onClick={() => setError(null)} className="admin-button">
            Cerrar
          </button>
        </div>
      )}

      <div className="menu-section">
        <h3>Gestionar Menú Semanal</h3>
        
        {/* Formulario para agregar nuevo ítem */}
        <form onSubmit={handleAddMenuItem} className="menu-form">
          <h4>Agregar Nueva Comida</h4>
          <div className="form-row">
            <select
              value={newMenuItem.day}
              onChange={(e) => setNewMenuItem({...newMenuItem, day: e.target.value})}
              required
            >
              {DAYS.map(day => (
                <option key={day} value={day}>{day}</option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Nombre de la comida"
              value={newMenuItem.food}
              onChange={(e) => setNewMenuItem({...newMenuItem, food: e.target.value})}
              required
            />
            <input
              type="text"
              placeholder="Stock disponible"
              value={newMenuItem.stock}
              onChange={(e) => handleStockChange(e)}
              pattern="[0-9]*"
              required
            />
          </div>
          <button type="submit" className="admin-button">Agregar Comida</button>
        </form>

        {/* Lista de ítems del menú */}
        <div className="menu-grid">
          {DAYS.map(day => (
            <div key={day} className="day-section">
              <h4>{day}</h4>
              <div className="day-items">
                {menuData
                  .filter(item => item.day === day)
                  .map((item) => (
                    <div key={item.id} className="menu-item">
                      <div className="item-details">
                        <h5>{item.food}</h5>
                        <p className="stock">Stock: {item.stock}</p>
                        <div className="item-actions">
                          <button 
                            onClick={() => setEditingMenuItem(item)}
                            className="admin-button"
                          >
                            Editar
                          </button>
                          <button 
                            onClick={() => handleDeleteMenuItem(item.id)}
                            className="admin-button delete"
                          >
                            Eliminar
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>

        {/* Modal de edición */}
        {editingMenuItem && (
          <div className="modal">
            <div className="modal-content">
              <h4>Editar Comida</h4>
              <form onSubmit={handleUpdateMenuItem}>
                <div className="form-row">
                  <select
                    value={editingMenuItem.day}
                    onChange={(e) => setEditingMenuItem({...editingMenuItem, day: e.target.value})}
                    required
                  >
                    {DAYS.map(day => (
                      <option key={day} value={day}>{day}</option>
                    ))}
                  </select>
                  <input
                    type="text"
                    placeholder="Nombre de la comida"
                    value={editingMenuItem.food}
                    onChange={(e) => setEditingMenuItem({...editingMenuItem, food: e.target.value})}
                    required
                  />
                  <input
                    type="text"
                    placeholder="Stock disponible"
                    value={editingMenuItem.stock}
                    onChange={(e) => handleStockChange(e, true)}
                    pattern="[0-9]*"
                    required
                  />
                </div>
                <div className="modal-actions">
                  <button type="submit" className="admin-button">Guardar</button>
                  <button 
                    type="button" 
                    onClick={() => setEditingMenuItem(null)}
                    className="admin-button"
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminMenu; 