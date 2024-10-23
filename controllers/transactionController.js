const Transaction = require('../models/transactionModel');

// Add a new transaction
const addTransaction = async (req, res) => {
  const { type, category, amount, date, description } = req.body;

  if (!type || !category || !amount) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const transaction = new Transaction({ type, category, amount, date, description });
    await transaction.save();
    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add transaction' });
  }
};

// Get all transactions
const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch transactions' });
  }
};

// Get a transaction by ID
const getTransactionById = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);
    if (!transaction) return res.status(404).json({ error: 'Transaction not found' });
    res.json(transaction);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching transaction' });
  }
};

// Update a transaction by ID
const updateTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!transaction) return res.status(404).json({ error: 'Transaction not found' });
    res.json(transaction);
  } catch (error) {
    res.status(500).json({ error: 'Error updating transaction' });
  }
};

// Delete a transaction by ID
const deleteTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findByIdAndDelete(req.params.id);
    if (!transaction) return res.status(404).json({ error: 'Transaction not found' });
    res.json({ message: 'Transaction deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting transaction' });
  }
};

// Get a summary of transactions
const getSummary = async (req, res) => {
  try {
    const transactions = await Transaction.find();
    const totalIncome = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
    const totalExpenses = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
    const balance = totalIncome - totalExpenses;
    res.json({ totalIncome, totalExpenses, balance });
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving summary' });
  }
};

module.exports = {
  addTransaction,
  getTransactions,
  getTransactionById,
  updateTransaction,
  deleteTransaction,
  getSummary,
};
