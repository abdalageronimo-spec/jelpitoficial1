app.post('/api/visita', async (req, res) => {
  try {
    const ip =
      req.headers['x-forwarded-for']?.split(',')[0]?.trim() ||
      req.socket.remoteAddress ||
      'No disponible';

    const userAgent = req.headers['user-agent'] || 'No disponible';

    const datos = req.body;

    const mensaje = `
🚀 Nueva visita

🌐 IP: ${ip}
🌍 Navegador/Explorador: ${datos.navegador || 'No disponible'}
💻 Sistema: ${datos.sistema || 'No disponible'}
🕒 Fecha: ${new Date().toLocaleString('es-CO')}
`;

    await axios.post(
      https://api.telegram.org/bot${process.env.TELEGRAM_TOKEN}/sendMessage,
      {
        chat_id: process.env.TELEGRAM_CHAT_ID,
        text: mensaje
      }
    );

    console.log('✅ Visita enviada a Telegram');

    res.json({
      enviado: true
    });

  } catch (error) {
    console.error(
      '❌ Error:',
      error.response?.data || error.message
    );

    res.status(500).json({
      enviado: false
    });
  }
});
