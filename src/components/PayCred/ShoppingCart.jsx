import React, { useState } from 'react';  
import CreditSelector from './CreditSelector';   
import './Style.css';  

const ShoppingCart = () => {  
    const [cart, setCart] = useState([]);  

    const handleAddToCart = (selectedCredit) => {  
        // Almacena la cantidad de créditos junto con su precio  
        setCart([...cart, selectedCredit]);  
    };  

    const handleRemoveFromCart = (index) => {  
        setCart(cart.filter((_, i) => i !== index));  
    };  

    const handleCheckout = () => {  
        alert('Redirigiendo a Mercado Pago...');  
    };  

    return (  
        <div className="shopping-cart">  
            <h1>Carrito de Compras</h1>  
            <CreditSelector onAddToCart={handleAddToCart} />  
            
            <h2>Créditos en el Carrito</h2>  
            <ul>  
                {cart.map((item, index) => (  
                    <li key={index}>  
                        {item.value} Créditos - Precio: ${item.price}  
                        <button   
                            onClick={() => handleRemoveFromCart(index)}   
                            style={{ marginLeft: '10px', color: 'darkred', background: 'none', cursor: 'pointer' }}>  
                            ✖  
                        </button>  
                    </li>  
                ))}  
            </ul>  
            
            <button onClick={handleCheckout}>Ir a Pagar</button>  
        </div>  
    );  
};  

export default ShoppingCart;  