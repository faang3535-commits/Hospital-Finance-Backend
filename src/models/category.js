'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    static associate(models) {
      Category.hasMany(models.Transaction, {
        foreignKey: 'category_id',
        as: 'transactions'
      });
    }
  }
  Category.init({
    name: DataTypes.STRING,
    type: DataTypes.STRING,
    value: DataTypes.STRING,
    status: {
      type: DataTypes.STRING,
      defaultValue: 'active'
    }
  }, {
    sequelize,
    modelName: 'Category',
    tableName: 'Categories',
    underscored: true,
  });
  return Category;
};