var Sequelize = require('sequelize');

var sequelize = new Sequelize('ulimahub', 'postgres', 'tu_contrasena', {
  host: 'localhost',
  dialect: 'postgres',
});

module.exports = sequelize;
