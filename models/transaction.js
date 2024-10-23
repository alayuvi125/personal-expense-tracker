const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Category = require('./category');

// Define the Transaction model
const Transaction = sequelize.define('Transaction', {
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  categoryId: {
    type: DataTypes.INTEGER,
    references: {
      model: Category,
      key: 'id',
    }
  },
  type: {
    type: DataTypes.ENUM('income', 'expense'),
    allowNull: false,
  }
});

Transaction.belongsTo(Category, { foreignKey: 'categoryId' });

module.exports = Transaction;
