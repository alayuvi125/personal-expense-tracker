const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/database');
const transactionRoutes = require('./routes/transactions');

const app = express();
app.use(bodyParser.json());

// Import models
const Transaction = require('./models/transaction');
const Category = require('./models/category');

// Sync database
sequelize.sync({ force: true }).then(() => {
  console.log('Database & tables created!');
});

// Routes
app.use('/transactions', transactionRoutes);

// Summary route for total income, expense, and balance
app.get('/summary', async (req, res) => {
  const income = await Transaction.sum('amount', { where: { type: 'income' } });
  const expense = await Transaction.sum('amount', { where: { type: 'expense' } });
  res.json({ totalIncome: income, totalExpense: expense, balance: income - expense });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
