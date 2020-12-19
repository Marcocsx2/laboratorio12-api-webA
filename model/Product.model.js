const { DataTypes, Sequelize } = require('sequelize');
const sequelize = require('../config/db');

class Product extends Sequelize.Model {}
Product.init(
  {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    precio: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    imagen: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Product',
    timestamps: false,
  }
);

module.exports = Product;
