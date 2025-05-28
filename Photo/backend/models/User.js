// backend/models/User.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  walletAddress: { type: String, required: true, unique: true },
  balance: { type: Number, default: 1000 } // Start with some memecoins
});

module.exports = mongoose.model('User', UserSchema);
