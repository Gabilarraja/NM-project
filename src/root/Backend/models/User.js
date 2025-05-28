const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
  walletAddress: { type: String, required: true, unique: true },
  username: String,
  balance: Number
});
module.exports = mongoose.model('User', UserSchema);