const mongoose = require('mongoose');

const cookieSchema = new mongoose.Schema({
  ip: { type: String },
  userAgent: { type: String },
  acceptedAt: { type: Date, default: Date.now },
  redirectUrl: { type: String, required: true }
});

module.exports = mongoose.model('CookieConsent', cookieSchema);