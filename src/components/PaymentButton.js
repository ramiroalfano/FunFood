import React, { useState } from 'react';
import { httpsCallable } from 'firebase/functions';
import { functions } from './firebase/FirebaseConfig'; // Ajusta la ruta si es necesario

const PaymentButton = ({ orderId, items, totalAmount }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleCheckout = async () => {
        setLoading(true);
        setError(null);

        try {
            // Referencia a tu Cloud Function callable
            const createMercadoPagoPreferenceCallable = httpsCallable(functions, 'createMercadoPagoPreference');

            // Llama a la Cloud Function con los datos del pedido
            const result = await createMercadoPagoPreferenceCallable({
                orderId,
                items,
                totalAmount
            });

            // El resultado de la llamada httpsCallable viene en un objeto con la propiedad `data`
            const { preferenceId, initPoint } = result.data;

            // Redirige al usuario a la URL de Mercado Pago
            if (initPoint) {
                window.location.href = initPoint;
            } else {
                setError('No se pudo obtener la URL de pago de Mercado Pago.');
            }

        } catch (err) {
            console.error("Error al iniciar el pago con Mercado Pago:", err);
            setError(err.message || 'Ocurrió un error al procesar tu pago.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            {error && <p style={{ color: 'red' }}>Error: {error}</p>}
            <button onClick={handleCheckout} disabled={loading}>
                {loading ? 'Redirigiendo a Mercado Pago...' : 'Pagar con Mercado Pago'}
            </button>
        </div>
    );
};

export default PaymentButton; 