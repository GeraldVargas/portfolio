const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();

const allowedOrigin = process.env.CORS_ORIGIN || 'http://localhost:4321';

app.use(cors({ origin: allowedOrigin }));
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.status(200).json({
    ok: true,
    message: 'Portfolio API running',
    timestamp: new Date().toISOString(),
  });
});

// ============================================
// POST /api/contact  –  Envía correo con Nodemailer
// ============================================
app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ ok: false, error: 'Todos los campos son requeridos.' });
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"Portfolio Contact" <${process.env.MAIL_USER}>`,
    to: process.env.MAIL_TO || process.env.MAIL_USER,
    replyTo: email,
    subject: `Nuevo mensaje de ${name} – Portfolio`,
    html: `
      <h2>Nuevo mensaje desde tu portfolio</h2>
      <p><strong>Nombre:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Mensaje:</strong></p>
      <p>${message.replace(/\n/g, '<br>')}</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return res.status(200).json({ ok: true, message: 'Correo enviado correctamente.' });
  } catch (err) {
    console.error('Error al enviar correo:', err);
    return res.status(500).json({ ok: false, error: 'No se pudo enviar el correo.' });
  }
});

module.exports = app;
