import React, { useState } from 'react';  

const CreditSelector = ({ onAddToCart }) => {  
    const [credits, setCredits] = useState("");  

    const handleAddCredits = () => {  
        if (credits) {  
            onAddToCart(Number(credits));  
            setCredits(""); // Reiniciar la selección  
        }  
    };  

    return (  
        <div className="credit-selector">  
            <h2>Selecciona Créditos</h2>  
            <select value={credits} onChange={(e) => setCredits(e.target.value)}>  
                <option value="" disabled>Elige una cantidad</option>  
                <option value="10">10 Créditos</option>  
                <option value="15">15 Créditos</option>  
                <option value="20">20 Créditos</option>  
                <option value="30">30 Créditos</option>  
            </select>  
            <button onClick={handleAddCredits}>Agregar al Carrito</button>  
            {credits && (  
                <p style={{ color: "red" }}>Los créditos solo se pueden usar por 30 días.</p>  
            )}  
        </div>  
    );  
};  

export default CreditSelector;  