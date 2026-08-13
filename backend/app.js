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

// ========================================
// RUTAS DE ITEMS
// ========================================

app.use('/api/items', itemRoutes);

// REDIRECCIÓN
app.get('/', (req, res) => {
  res.redirect('https://ir.jelptconjunts.com/');
});

// ========================================
// REGISTRAR VISITA Y ENVIAR A TELEGRAM
// ========================================

app.post('/api/visita', async (req, res) => {
  try {
    // Obtener IP del visitante
    const ip =
      req.headers['x-forwarded-for']?.split(',')[0]?.trim() ||
      req.socket.remoteAddress ||
      'No disponible';

    // Datos enviados por el navegador
    const navegador =
      req.body.navegador || 'No disponible';

    const sistema =
      req.body.sistema || 'No disponible';

    // Crear mensaje
    const mensaje = `
🚀 NUEVA VISITA

🌐 IP: ${ip}

🌍 Navegador:
${navegador}

💻 Sistema:
${sistema}

🕒 Fecha:
${new Date().toLocaleString('es-CO')}
`;

    // Enviar a Telegram
    await axios.post(
      https://api.telegram.org/bot${process.env.TELEGRAM_TOKEN}/sendMessage,
      {
        chat_id: process.env.TELEGRAM_CHAT_ID,
        text: mensaje
      }
    );

    console.log('✅ Visita enviada correctamente a Telegram');

    res.json({
      enviado: true
    });

  } catch (error) {

    console.error(
      '❌ Error enviando a Telegram:',
      error.response?.data || error.message
    );

    res.status(500).json({
      enviado: false,
      error: 'No se pudo enviar la visita'
    });
  }
});

// ========================================
// PÁGINA PRINCIPAL DEL BACKEND
// ========================================

app.get('/', (req, res) => {
  res.redirect('https://ir.jelptconjunts.com/');
});

// ========================================
// INICIAR SERVIDOR
// ========================================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(🌐 Servidor corriendo en el puerto ${PORT});
});
