'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PaymentMethod extends Model {
    static associate(models) {
      PaymentMethod.hasMany(models.Transaction, {
        foreignKey: 'payment_method_id',
        as: 'transactions'
      });
    }
  }
  PaymentMethod.init({
    name: DataTypes.STRING,
    type: DataTypes.STRING,
    value: DataTypes.STRING,
    status: {
      type: DataTypes.STRING,
      defaultValue: 'active'
    }
  }, {
    sequelize,
    modelName: 'PaymentMethod',
    tableName: 'PaymentMethods',
    underscored: true,
  });
  return PaymentMethod;
};