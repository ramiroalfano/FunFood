import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Style.css';

const PaymentSuccess = () => {
    const navigate = useNavigate();

    return (
        <div className="payment-result success">
            <h1>¡Pago Exitoso!</h1>
            <p>Tu compra ha sido procesada correctamente.</p>
            <button onClick={() => navigate('/')} className="return-button">
                Volver al inicio
            </button>
        </div>
    );
};

export default PaymentSuccess; 