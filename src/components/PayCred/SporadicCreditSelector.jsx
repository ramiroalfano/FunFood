import React, { useState } from 'react';  
import Swal from 'sweetalert2';  

// Opciones de créditos y sus precios para compras esporádicas (precios más elevados)  
const creditOptions = [  
    { value: 1, price: 6500 },  // Precio aumentado
    { value: 2, price: 13000 }, // Precio aumentado
    { value: 3, price: 19500 }  // Precio aumentado
];  

const SporadicCreditSelector = ({ onAddToCart }) => {  
    const [credits, setCredits] = useState("");  

    const handleAddCredits = () => {  
        if (credits) {  
            const selectedCredit = creditOptions.find(option => option.value === Number(credits));  
            if (selectedCredit) {  
                onAddToCart(selectedCredit);  
                Swal.fire({  
                    title: 'Créditos Agregados',  
                    text: `Has añadido ${selectedCredit.value} créditos al carrito.\nPrecio: $${selectedCredit.price}`,  
                    icon: 'success',  
                    confirmButtonText: 'Aceptar'  
                });  
                setCredits("");  
            }  
        } else {  
            Swal.fire({  
                title: 'Error',  
                text: 'Por favor, selecciona una cantidad de créditos.',  
                icon: 'error',  
                confirmButtonText: 'Aceptar'  
            });  
        }  
    };   

    return (  
        <div className="credit-selector">  
            <h2>Selecciona Créditos para Compra Esporádica</h2>  
            <select value={credits} onChange={(e) => setCredits(e.target.value)}>  
                <option value="" disabled>Elige una cantidad</option>  
                {creditOptions.map(option => (  
                    <option key={option.value} value={option.value}>  
                        {option.value} Créditos - Precio: ${option.price}  
                    </option>  
                ))}  
            </select>  
            <button onClick={handleAddCredits}>Agregar al Carrito</button>  
            {credits && (  
                <p style={{ color: "red" }}>Los créditos solo se pueden usar por 30 días.</p>  
            )}  
        </div>  
    );  
};  

export default SporadicCreditSelector; 