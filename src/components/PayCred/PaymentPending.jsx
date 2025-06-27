import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Style.css';

const PaymentPending = () => {
    const navigate = useNavigate();

    return (
        <div className="payment-result pending">
            <h1>Pago Pendiente</h1>
            <p>Tu pago está siendo procesado. Te notificaremos cuando se complete.</p>
            <button onClick={() => navigate('/')} className="return-button">
                Volver al inicio
            </button>
        </div>
    );
};

export default PaymentPending; 