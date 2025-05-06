import React, { useState } from 'react';  
import Swal from 'sweetalert2'; // Importa SweetAlert2  

// Opciones de créditos y sus precios  
const creditOptions = [  
    { value: 1, price: 5300 },  
    { value: 2, price: 10600 },  
    { value: 3, price: 15900 },
    { value: 4, price: 20000 },  
    { value: 6, price: 30000 },  
    { value: 8, price: 40000 },  
    { value: 10, price: 50000 },  
    { value: 12, price: 60000 },  
    { value: 14, price: 70000 },  
    { value: 16, price: 80000 }  
];  

const CreditSelector = ({ onAddToCart }) => {  
    const [credits, setCredits] = useState("");  

    const handleAddCredits = () => {  
        if (credits) {  
            const selectedCredit = creditOptions.find(option => option.value === Number(credits));  
            if (selectedCredit) {  
                onAddToCart(selectedCredit);  // Pasa el objeto completo  
                Swal.fire({  
                    title: 'Créditos Agregados',  
                    text: `Has añadido ${selectedCredit.value} créditos al carrito.\nPrecio: $${selectedCredit.price}`,  
                    icon: 'success',  
                    confirmButtonText: 'Aceptar'  
                });  
                setCredits(""); // Reiniciar la selección  
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
            <h2>Selecciona Créditos</h2>  
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

export default CreditSelector;  