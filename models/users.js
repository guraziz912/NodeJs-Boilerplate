const Sequelize = require('sequelize');
const sequelize = require('../database/databaseConnection');

// user model
const userData = sequelize.define('user', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
    unique: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  confirmPassword: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  file: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  role: {
    type: Sequelize.DataTypes.ENUM('user', 'admin', 'guest'),
    defaultValue: 'user',
  },
});

module.exports = userData;
