import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { MP_PUBLIC_KEY } from '../../config/mercadoPago';
import { getFunctions, httpsCallable } from 'firebase/functions';
import './Style.css';

function MenuPayment() {
    const location = useLocation();
    const navigate = useNavigate();
    const [selectedItems, setSelectedItems] = useState([]);
    const [preferenceId, setPreferenceId] = useState(null);
    const [error, setError] = useState(null);
    const PRICE_SINGLE = 6500; // Precio para 1-2 ítems
    const PRICE_MULTIPLE = 6000; // Precio para 3 o más ítems

    useEffect(() => {
        if (location.state?.selectedItems) {
            setSelectedItems(location.state.selectedItems);
            createPreference();
        } else {
            navigate('/menu');
        }
    }, [location.state]);

    useEffect(() => {
        // Cargar el script de Mercado Pago
        const script = document.createElement('script');
        script.src = 'https://sdk.mercadopago.com/js/v2';
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    const createPreference = async () => {
        try {
            const functions = getFunctions();
            const createPreferenceFunction = httpsCallable(functions, 'createPreference');

            const result = await createPreferenceFunction({
                items: selectedItems.map(item => ({
                    title: item.food,
                    unit_price: selectedItems.length <= 2 ? PRICE_SINGLE : PRICE_MULTIPLE,
                    quantity: 1,
                })),
                back_urls: {
                    success: window.location.origin + '/success',
                    failure: window.location.origin + '/failure',
                    pending: window.location.origin + '/pending',
                }
            });

            const data = result.data;
            setPreferenceId(data.id);

            // Crear el botón de pago de Mercado Pago
            const mp = new window.MercadoPago(MP_PUBLIC_KEY);
            mp.bricks().create('wallet', 'wallet_container', {
                initialization: {
                    preferenceId: data.id
                }
            });
        } catch (error) {
            console.error('Error al crear la preferencia:', error);
            setError("Error al procesar el pago. Por favor, intenta nuevamente.");
        }
    };

    const calculateTotal = () => {
        return selectedItems.length <= 2 ? 
            selectedItems.length * PRICE_SINGLE : 
            selectedItems.length * PRICE_MULTIPLE;
    };

    return (
        <div className="payment-container">
            <h2>Resumen de tu Pedido</h2>
            
            {error && (
                <div className="error-message">
                    <p>{error}</p>
                    <button onClick={() => setError(null)} className="close-button">
                        Cerrar
                    </button>
                </div>
            )}

            <div className="order-summary">
                <h3>Ítems seleccionados:</h3>
                <ul>
                    {selectedItems.map((item, index) => (
                        <li key={index}>{item.food}</li>
                    ))}
                </ul>

                <div className="price-breakdown">
                    <p>Precio por ítem: ${selectedItems.length <= 2 ? PRICE_SINGLE : PRICE_MULTIPLE}</p>
                    <p>Subtotal: ${calculateTotal()}</p>
                    {selectedItems.length >= 3 && (
                        <p className="discount">¡Descuento aplicado por comprar 3 o más ítems!</p>
                    )}
                    <h4>Total a pagar: ${calculateTotal()}</h4>
                </div>

                <div id="wallet_container"></div>
            </div>
        </div>
    );
}

export default MenuPayment; 