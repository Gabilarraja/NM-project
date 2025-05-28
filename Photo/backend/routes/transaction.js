// backend/routes/transaction.js

const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');
const Photo = require('../models/Photo');
const User = require('../models/User');

// GET all transactions
router.get('/', async (req, res) => {
  try {
    const transactions = await Transaction.find()
      .populate('buyer')
      .populate('photo');
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching transactions', error: err });
  }
});

// POST a new transaction (simulate photo purchase)
router.post('/', async (req, res) => {
  const { buyerId, photoId } = req.body;

  try {
    const buyer = await User.findById(buyerId);
    const photo = await Photo.findById(photoId).populate('owner');

    if (!buyer || !photo) {
      return res.status(404).json({ message: 'Buyer or photo not found' });
    }

    if (buyer.balance < photo.price) {
      return res.status(400).json({ message: 'Insufficient balance' });
    }

    const seller = photo.owner;
    buyer.balance -= photo.price;
    seller.balance += photo.price;

    await buyer.save();
    await seller.save();

    photo.owner = buyer._id;
    await photo.save();

    const transaction = new Transaction({
      buyer: buyer._id,
      photo: photo._id,
      price: photo.price
    });

    await transaction.save();

    res.status(201).json(transaction);
  } catch (err) {
    res.status(500).json({ message: 'Transaction failed', error: err });
  }
});

module.exports = router;
