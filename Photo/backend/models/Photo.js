// backend/models/Photo.js
const mongoose = require('mongoose');

const PhotoSchema = new mongoose.Schema({
  url: { type: String, required: true },
  title: { type: String },
  description: { type: String },
  price: { type: Number, default: 0 },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Photo', PhotoSchema);

