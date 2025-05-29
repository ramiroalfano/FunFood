import React, { useState, useEffect } from 'react';
import { firestoreDb } from '../firebase/FirebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import './Menu.css';

function Menu() {
  const [menuData, setMenuData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const DAYS = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

  useEffect(() => {
    console.log("Iniciando carga del menú...");
    fetchMenuData();
  }, []);

  const fetchMenuData = async () => {
    try {
      console.log("Intentando conectar con Firestore...");
      const menuRef = collection(firestoreDb, 'card');
      console.log("Referencia a la colección creada:", menuRef);
      
      const snapshot = await getDocs(menuRef);
      console.log("Datos obtenidos:", snapshot.docs.length, "documentos");
      
      const menu = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      console.log("Datos procesados:", menu);
      
      setMenuData(menu);
      setLoading(false);
    } catch (err) {
      console.error("Error detallado al obtener menú:", err);
      setError(`Error al cargar el menú: ${err.message}`);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="menu-container">
        <div className="loading-message">
          <h3>Cargando menú...</h3>
          <p>Por favor, espera un momento</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="menu-container">
        <div className="error-message">
          <h3>Error al cargar el menú</h3>
          <p>{error}</p>
          <button 
            onClick={() => {
              setLoading(true);
              setError(null);
              fetchMenuData();
            }} 
            className="retry-button"
          >
            Intentar nuevamente
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="menu-container">
      <h2>Nuestro Menú Semanal</h2>
      {menuData.length === 0 ? (
        <div className="no-data-message">
          <p>No hay comidas disponibles en el menú</p>
        </div>
      ) : (
        <div className="menu-grid">
          {DAYS.map(day => (
            <div key={day} className="day-section">
              <h3>{day}</h3>
              <div className="day-items">
                {menuData
                  .filter(item => item.day === day)
                  .map((item) => (
                    <div key={item.id} className="menu-card">
                      <div className="card-content">
                        <h4>{item.food}</h4>
                        <div className="stock-badge">
                          Stock: {item.stock}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Menu; 