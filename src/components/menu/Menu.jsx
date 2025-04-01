import React, { useState } from 'react';  
import MenuCard from './MenuCard';  

const menuItems = [  
    { day: "Lunes", meal: "Milanesa de carne con puré de papas" },  
    { day: "Martes", meal: "Tarta cremosa de jamón y queso" },  
    { day: "Miércoles", meal: "Pollo al horno con arroz primavera" },  
    { day: "Jueves", meal: "Pizzas de Marcelo: muzzo, huevo duro, jamón, pepperoni" },  
];  

const Menu = () => {  
    const [selectedDays, setSelectedDays] = useState([]);  

    const handleSelect = (index) => {  
        if (selectedDays.includes(index)) {  
            setSelectedDays(selectedDays.filter(day => day !== index));  
        } else {  
            setSelectedDays([...selectedDays, index]);  
        }  
    };  

    const handleSubmit = () => {  
        const selectedMeals = selectedDays.map(dayIndex => menuItems[dayIndex].day);  
        alert(`Días seleccionados: ${selectedMeals.join(', ')}`);  
    };  

    return (  
        <div className="menu-container">  
            {menuItems.map((item, index) => (  
                <MenuCard   
                    key={index}   
                    day={item.day}   
                    meal={item.meal}   
                    selected={selectedDays.includes(index)}   
                    onSelect={() => handleSelect(index)}   
                />  
            ))}  
            <button onClick={handleSubmit}>Enviar</button>  
        </div>  
    );  
};  

export default Menu;  