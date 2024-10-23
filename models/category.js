const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Define the Category model
const Category = sequelize.define('Category', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  type: {
    type: DataTypes.ENUM('income', 'expense'),
    allowNull: false,
  },
});

module.exports = Category;
