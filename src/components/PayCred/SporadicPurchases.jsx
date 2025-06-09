import React, { useState } from 'react';  
import SporadicCreditSelector from './SporadicCreditSelector';   
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import './Style.css';  

// Inicializa Mercado Pago con la public key desde las variables de entorno
initMercadoPago(process.env.REACT_APP_MERCADOPAGO_PUBLIC_KEY);

const SporadicPurchases = () => {  
    const [cart, setCart] = useState([]);  
    const [showPayment, setShowPayment] = useState(false);
    const [preferenceId, setPreferenceId] = useState(null);

    const handleAddToCart = (selectedCredit) => {  
        // Almacena la cantidad de créditos junto con su precio  
        setCart([...cart, selectedCredit]);  
    };  

    const handleRemoveFromCart = (index) => {  
        setCart(cart.filter((_, i) => i !== index));  
    };  

    const handleCheckout = async () => {  
        try {
            // Aquí deberías hacer una llamada a tu backend para crear la preferencia de pago
            // Por ahora usamos un ID de prueba
            setPreferenceId('TEST-123456789-123456789-123456789');
            setShowPayment(true);
        } catch (error) {
            console.error('Error al crear la preferencia de pago:', error);
            alert('Error al procesar el pago. Por favor, intente nuevamente.');
        }
    };  

    const calculateTotal = () => {
        return cart.reduce((total, item) => total + item.price, 0);
    };

    return (  
        <div className="shopping-cart">  
            <h1>Compras Esporádicas</h1>  
            <SporadicCreditSelector onAddToCart={handleAddToCart} />  
            
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
            
            {cart.length > 0 && (
                <div className="cart-summary">
                    <h3>Total: ${calculateTotal()}</h3>
                    <button onClick={handleCheckout}>Ir a Pagar</button>
                </div>
            )}

            {showPayment && preferenceId && (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px' }}>
                    <h2>Pago con Mercado Pago</h2>
                    <p>Haz clic en el botón para realizar el pago.</p>
                    <div style={{ width: '300px' }}>
                        <Wallet initialization={{ preferenceId: preferenceId }} />
                    </div>
                </div>
            )}
        </div>  
    );  
};  

export default SporadicPurchases; 