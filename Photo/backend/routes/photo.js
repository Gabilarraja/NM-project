// backend/routes/photo.js

const express = require('express');
const router = express.Router();
const Photo = require('../models/Photo');

// GET all photos
router.get('/', async (req, res) => {
  try {
    const photos = await Photo.find().populate('owner');
    res.json(photos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST upload a new photo
router.post('/', async (req, res) => {
  const { url, title, description, price, ownerId } = req.body;
  try {
    const photo = new Photo({ url, title, description, price, owner: ownerId });
    await photo.save();
    res.status(201).json(photo);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
