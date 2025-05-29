import React, { useState, useEffect } from 'react';
import { firestoreDb } from './firebase/FirebaseConfig';
import { collection, getDocs, updateDoc, doc, increment } from 'firebase/firestore';
import './Menu.css';

function Menu() {
  const [menuData, setMenuData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedDays, setSelectedDays] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showDaysAlert, setShowDaysAlert] = useState(false);

  const DAYS = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];

  useEffect(() => {
    fetchMenuData();
  }, []);

  const fetchMenuData = async () => {
    try {
      console.log("Obteniendo datos del menú...");
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

  const handleSelectItem = (item) => {
    console.log("Intentando seleccionar ítem:", item);
    
    if (item.stock <= 0) {
      setError("Lo sentimos, este ítem no está disponible en este momento.");
      return;
    }

    const isSelected = selectedItems.some(selected => selected.id === item.id);
    if (isSelected) {
      console.log("Deseleccionando ítem:", item.id);
      setSelectedItems(selectedItems.filter(selected => selected.id !== item.id));
    } else {
      console.log("Seleccionando ítem:", item.id);
      setSelectedItems([...selectedItems, item]);
    }
  };

  const handleDaySelection = (day) => {
    const isSelected = selectedDays.includes(day);
    if (isSelected) {
      setSelectedDays(selectedDays.filter(d => d !== day));
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };

  const handleShowSelectedDays = () => {
    if (selectedDays.length === 0) {
      setError("Por favor, selecciona al menos un día.");
      return;
    }
    setShowDaysAlert(true);
  };

  const handlePurchase = async () => {
    if (selectedItems.length === 0) {
      setError("Por favor, selecciona al menos un ítem para comprar.");
      return;
    }

    try {
      console.log("Iniciando proceso de compra...");
      console.log("Ítems seleccionados:", selectedItems);

      // Actualizar el stock para cada ítem seleccionado
      for (const item of selectedItems) {
        console.log("Actualizando stock para ítem:", item.id);
        const menuRef = doc(firestoreDb, 'card', item.id);
        
        // Usar increment para asegurar actualizaciones atómicas
        await updateDoc(menuRef, {
          stock: increment(-1)
        });
        
        console.log("Stock actualizado para ítem:", item.id);
      }

      // Actualizar la lista de menú
      await fetchMenuData();
      
      // Mostrar mensaje de éxito
      setShowSuccess(true);
      setSelectedItems([]);
      
      // Ocultar mensaje después de 3 segundos
      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    } catch (err) {
      console.error("Error al procesar la compra:", err);
      setError("Error al procesar la compra. Por favor, intenta nuevamente.");
    }
  };

  if (loading) {
    return <div className="menu-container">Cargando menú...</div>;
  }

  return (
    <div className="menu-container">
      <h2>Menú Semanal</h2>
      
      {error && (
        <div className="error-message">
          <p>{error}</p>
          <button onClick={() => setError(null)} className="close-button">
            Cerrar
          </button>
        </div>
      )}

      {showSuccess && (
        <div className="success-message">
          <p>¡Compra realizada con éxito!</p>
        </div>
      )}

      {showDaysAlert && (
        <div className="days-alert">
          <div className="days-alert-content">
            <h3>Días Seleccionados:</h3>
            <ul>
              {selectedDays.map(day => (
                <li key={day}>{day}</li>
              ))}
            </ul>
            <button onClick={() => setShowDaysAlert(false)} className="close-button">
              Cerrar
            </button>
          </div>
        </div>
      )}

      <div className="days-selection">
        {DAYS.map(day => (
          <button
            key={day}
            className={`day-button ${selectedDays.includes(day) ? 'selected' : ''}`}
            onClick={() => handleDaySelection(day)}
          >
            {day}
          </button>
        ))}
        <button onClick={handleShowSelectedDays} className="show-days-button">
          Ver Días Seleccionados
        </button>
      </div>

      <div className="menu-grid">
        {DAYS.map(day => (
          <div key={day} className="day-section">
            <h3>{day}</h3>
            <div className="day-items">
              {menuData
                .filter(item => item.day === day)
                .map((item) => (
                  <div 
                    key={item.id} 
                    className={`menu-item ${selectedItems.some(selected => selected.id === item.id) ? 'selected' : ''} ${item.stock <= 0 ? 'out-of-stock' : ''}`}
                    onClick={() => handleSelectItem(item)}
                  >
                    <div className="item-details">
                      <h4>{item.food}</h4>
                      <p className="stock">Stock disponible: {item.stock}</p>
                      {item.stock <= 0 && (
                        <p className="out-of-stock-message">Agotado</p>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>

      {selectedItems.length > 0 && (
        <div className="purchase-section">
          <h3>Ítems seleccionados: {selectedItems.length}</h3>
          <button onClick={handlePurchase} className="purchase-button">
            Comprar seleccionados
          </button>
        </div>
      )}
    </div>
  );
}

export default Menu; 