import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Style.css';

const PaymentFailure = () => {
    const navigate = useNavigate();

    return (
        <div className="payment-result failure">
            <h1>Pago Fallido</h1>
            <p>Hubo un problema al procesar tu pago. Por favor, intenta nuevamente.</p>
            <button onClick={() => navigate('/menu')} className="return-button">
                Volver al menú
            </button>
        </div>
    );
};

export default PaymentFailure; 