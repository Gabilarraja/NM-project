const TransactionSchema = new mongoose.Schema({
  buyer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  photo: { type: mongoose.Schema.Types.ObjectId, ref: 'Photo' },
  price: Number,
  date: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Transaction', TransactionSchema);