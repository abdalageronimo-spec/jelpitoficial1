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

// Iniciar servidor
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(🌐 Servidor corriendo en http://localhost:${PORT});
});