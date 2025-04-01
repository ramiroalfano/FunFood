import React, { useState } from 'react';  
import './Style.css'; // Asegúrate de tener esto importado  

const daysData = [  
    { day: 'Lunes', stock: 10, meal: 'Pollo a la parrilla' },  
    { day: 'Martes', stock: 10, meal: 'Tarta cremosa de jamón y queso' },  
    { day: 'Miércoles', stock: 10, meal: 'Pollo al horno con arroz primavera' },  
    { day: 'Jueves', stock: 10, meal: 'Pizzas de Marcelo: muzzo, huevo duro, jamón, pepperoni' },  
];  

const Calendar = () => {  
    const [days, setDays] = useState(daysData);  
    const [selectedDays, setSelectedDays] = useState([]);  

    const handleSelectDay = (day) => {  
        const dayInfo = days.find(d => d.day === day);  
        if (dayInfo && dayInfo.stock > 0) {  
            if (selectedDays.includes(day)) {  
                setSelectedDays(selectedDays.filter(d => d !== day));  
                updateStock(day, 1);  
            } else {  
                setSelectedDays([...selectedDays, day]);  
                updateStock(day, -1);  
            }  
        }  
    };  

    const updateStock = (day, change) => {  
        setDays(days.map(d =>   
            d.day === day ? { ...d, stock: d.stock + change } : d  
        ));  
    };  

    const handleSubmit = () => {  
        const alertMessage = selectedDays.map(day => `${day}: 1 crédito`).join('\n');  
        alert(`Días seleccionados y créditos gastados:\n${alertMessage}`);  
    };  

    return (  
        <div className="calendario-container">  
            <h1>Calendario de Créditos</h1>  
            <div className="d-flex flex-column align-items-center">  
                {days.map(({ day, stock, meal }) => (  
                    <div  
                        key={day}  
                        className={`calendario-card ${selectedDays.includes(day) ? 'selected' : ''}`}  
                        onClick={() => handleSelectDay(day)}  
                    >  
                        <h2>{day}</h2>  
                        <p>Comida: {meal}</p>  
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