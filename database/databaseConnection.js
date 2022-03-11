const Sequelize = require('sequelize');

const sequelize = new Sequelize('nodeBoilerplate', 'root', 'Guraziz@98', {
  dialect: 'mysql',
  host: 'localhost',
});
module.exports = sequelize;
