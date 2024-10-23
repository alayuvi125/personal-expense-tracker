const express = require('express');
const router = express.Router();
const Transaction = require('../models/transaction');

// Add a new transaction
router.post('/', async (req, res) => {
  try {
    const { amount, description, type, categoryId, date } = req.body;
    const transaction = await Transaction.create({ amount, description, type, categoryId, date });
    res.status(201).json(transaction);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all transactions
router.get('/', async (req, res) => {
  const transactions = await Transaction.findAll();
  res.json(transactions);
});

// Get a single transaction by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const transaction = await Transaction.findByPk(id);
  if (!transaction) return res.status(404).json({ error: 'Transaction not found' });
  res.json(transaction);
});

// Update a transaction
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { amount, description, type, categoryId, date } = req.body;
  const transaction = await Transaction.findByPk(id);
  if (!transaction) return res.status(404).json({ error: 'Transaction not found' });

  transaction.amount = amount;
  transaction.description = description;
  transaction.type = type;
  transaction.categoryId = categoryId;
  transaction.date = date;
  await transaction.save();
  res.json(transaction);
});

// Delete a transaction
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const transaction = await Transaction.findByPk(id);
  if (!transaction) return res.status(404).json({ error: 'Transaction not found' });

  await transaction.destroy();
  res.json({ message: 'Transaction deleted' });
});

module.exports = router;
