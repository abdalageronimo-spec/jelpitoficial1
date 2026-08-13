require('dotenv').config();

const express = require('express');
const cors = require('cors');
const axios = require('axios');

const connectDB = require('./src/config/db');
const itemRoutes = require('./src/routes/itemRoutes');

// Conectar a MongoDB
connectDB();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/items', itemRoutes);

// ========================================
// RUTA PARA ENVIAR VISITAS A TELEGRAM
// ========================================

app.post('/api/visita', async (req, res) => {
  try {
    const datos = req.body;

    const mensaje = `
🚀 NUEVA VISITA

🌐 Navegador:
${datos.navegador || 'No disponible'}

💻 Sistema:
${datos.sistema || 'No disponible'}

🕒 Fecha:
${new Date().toLocaleString('es-CO')}

📍 Información recibida desde el sitio web.
`;

    await axios.post(
      https://api.telegram.org/bot${process.env.TELEGRAM_TOKEN}/sendMessage,
      {
        chat_id: process.env.TELEGRAM_CHAT_ID,
        text: mensaje
      }
    );

    console.log('✅ Información enviada a Telegram');

    res.json({
      enviado: true,
      mensaje: 'Información enviada correctamente'
    });

  } catch (error) {
    console.error(
      '❌ Error enviando información a Telegram:',
      error.response?.data || error.message
    );

    res.status(500).json({
      enviado: false,
      error: 'No se pudo enviar la información a Telegram'
    });
  }
});

// ========================================
// RUTA PRINCIPAL
// ========================================

app.get('/', (req, res) => {
  res.json({
    message: 'API funcionando 🚀',
    endpoints: {
      items: '/api/items',
      visita: '/api/visita'
    }
  });
});

// ========================================
// INICIAR SERVIDOR
// ========================================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(🌐 Servidor corriendo en el puerto ${PORT});
});
