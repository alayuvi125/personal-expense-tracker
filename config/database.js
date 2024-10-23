const { Sequelize } = require('sequelize');

// SQLite connection
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './finance.sqlite'
});

module.exports = sequelize;
