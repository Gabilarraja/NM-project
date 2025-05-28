// backend/models/Transaction.js
const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
  buyer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  photo: { type: mongoose.Schema.Types.ObjectId, ref: 'Photo', required: true },
  price: { type: Number, required: true },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Transaction', TransactionSchema);
