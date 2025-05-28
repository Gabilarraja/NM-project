const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON requests

// Routes
app.use('/api/users', require('./routes/user'));
app.use('/api/photos', require('./routes/photo'));
app.use('/api/transactions', require('./routes/transaction'));

// Root test route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Connect to MongoDB and start server
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('✅ Connected to MongoDB');
  app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
})
.catch(err => {
  console.error('❌ MongoDB connection error:', err);
});
