import React, { useState, useEffect } from 'react';
// Importa las funciones de Firestore directamente desde el paquete
import { collection, doc, updateDoc, getDocs } from 'firebase/firestore'; 
// Importa tu instancia de la base de datos desde tu archivo de configuración
import { firestoreDb } from '../firebase/FirebaseConfig'; 

import './Style.css';

const Calendar = () => {
    const [days, setDays] = useState([]);
    const [selectedDays, setSelectedDays] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);

            try {
                // Usa firestoreDb para referenciar tu base de datos
                const querySnapshot = await getDocs(collection(firestoreDb, "menus")); 
                const initialData = querySnapshot.docs.map(doc => ({
                    day: doc.id,
                    ...doc.data()
                }));
                setDays(initialData);
            } catch (e) {
                console.error("Error fetching data:", e);
                setError("Failed to load menu data. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleSelectDay = async (day) => {
        const dayInfo = days.find(d => d.day === day);
        if (dayInfo && dayInfo.stock > 0) {
            if (selectedDays.includes(day)) {
                setSelectedDays(selectedDays.filter(d => d !== day));
                await updateStock(day, 1);
            } else {
                setSelectedDays([...selectedDays, day]);
                await updateStock(day, -1);
            }
        }
    };

    const updateStock = async (day, change) => {
        try {
            // Usa firestoreDb para referenciar tu base de datos
            const dayRef = doc(firestoreDb, "menus", day); 
            await updateDoc(dayRef, {
                stock: days.find(d => d.day === day).stock + change
            });

            // Actualizar el estado local
            setDays(days.map(d =>
                d.day === day ? { ...d, stock: d.stock + change } : d
            ));
        } catch (e) {
            console.error("Error updating stock:", e);
            setError("Failed to update stock. Please check your connection and try again.");
        }
    };

    const handleSubmit = () => {
        const alertMessage = selectedDays.map(day => `${day}: 1 crédito`).join('\n');
        alert(`Días seleccionados y créditos gastados:\n${alertMessage}`);
    };

    // Renderizado condicional
    if (loading) {
        return <div className="loading">Cargando calendario...</div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    return (
        <div className="calendario-container">
            <h1>Calendario de Créditos</h1>
            <div className="d-flex flex-column align-items-center">
                {days.map(({ day, stock, food }) => (
                    <div
                        key={day}
                        className={`calendario-card ${selectedDays.includes(day) ? 'selected' : ''}`}
                        onClick={() => handleSelectDay(day)}
                    >
                        <h2>{day}</h2>
                        <p>Comida: {food}</p>
                        <p>Créditos disponibles: {stock}</p>
                        {selectedDays.includes(day) && <span>¡Seleccionado!</span>}
                    </div>
                ))}
            </div>
            <button onClick={handleSubmit}>Enviar</button>
        </div>
    );
};

export default Calendar;
