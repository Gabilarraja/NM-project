// backend/routes/user.js

const express = require('express');
const router = express.Router();
const User = require('../models/User');

// GET all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST create a new user
router.post('/', async (req, res) => {
  const { username, walletAddress } = req.body;
  try {
    const user = new User({ username, walletAddress });
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
