const functions = require('firebase-functions');
const { MercadoPagoConfig, Preference } = require('mercadopago');

// Configuración de Mercado Pago
const client = new MercadoPagoConfig({ 
  accessToken: 'TU_ACCESS_TOKEN_DE_MERCADO_PAGO' 
});

exports.createPreference = functions.https.onRequest(async (req, res) => {
  // Habilitar CORS
  res.set('Access-Control-Allow-Origin', '*');
  
  if (req.method === 'OPTIONS') {
    // Enviar respuesta preflight
    res.set('Access-Control-Allow-Methods', 'POST');
    res.set('Access-Control-Allow-Headers', 'Content-Type');
    res.status(204).send('');
    return;
  }

  try {
    const preference = new Preference(client);
    const result = await preference.create({
      body: {
        items: req.body.items,
        back_urls: {
          success: req.body.back_urls.success,
          failure: req.body.back_urls.failure,
          pending: req.body.back_urls.pending,
        },
        auto_return: 'approved',
        purpose: 'wallet_purchase'
      }
    });

    res.status(200).json(result);
  } catch (error) {
    console.error('Error al crear la preferencia:', error);
    res.status(500).json({ error: error.message });
  }
}); 