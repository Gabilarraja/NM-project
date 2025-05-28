const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Photo = require('../models/Photo');

router.get('/', async (req, res) => {
  const photos = await Photo.find().populate('owner');
  res.json(photos);
});

router.post('/', async (req, res) => {
  const photo = new Photo(req.body);
  await photo.save();
  res.json(photo);
});

module.exports = router;