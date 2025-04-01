import React, { useState } from 'react';  
import CreditSelector from './CreditSelector'; 
import './Style.css';

const ShoppingCart = () => {  
    const [cart, setCart] = useState([]);  

    const handleAddToCart = (credits) => {  
        setCart([...cart, credits]);  
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
                {cart.map((credits, index) => (  
                    <li key={index}>  
                        {credits} Créditos   
                        <button onClick={() => handleRemoveFromCart(index)} style={{ marginLeft: '10px', color: 'darkred', background: 'none', cursor: 'pointer' }}>✖</button>  
                    </li>  
                ))}  
            </ul>  
            
            <button onClick={handleCheckout}>Ir a Pagar</button>  
        </div>  
    );  
};  

export default ShoppingCart;  