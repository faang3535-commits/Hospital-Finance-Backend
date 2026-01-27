'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
   
    static associate(models) {
      Transaction.belongsTo(models.Category, {
        foreignKey: 'category_id',
        as: 'category'
      });
      
      Transaction.belongsTo(models.PaymentMethod, {
        foreignKey: 'payment_method_id',
        as: 'paymentMethod'
      });
      
      Transaction.belongsTo(models.User, {
        foreignKey: 'created_by',
        as: 'creator'
      });
    }
  }
  Transaction.init({
    file_no: DataTypes.STRING,
    patient_name: DataTypes.STRING,
    payee_name: DataTypes.STRING,
    amount: DataTypes.DECIMAL,
    transaction_date: DataTypes.DATE,
    type: DataTypes.STRING,
    category_id: DataTypes.INTEGER,
    payment_method_id: DataTypes.INTEGER,
    created_by: DataTypes.INTEGER,
    notes: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Transaction',
    tableName: 'Transactions',
    underscored: true,
    indexes: [
      {
        name: 'idx_transactions_transaction_date',
        fields: ['transaction_date']
      },
      {
        name: 'idx_transactions_payment_method_id',
        fields: ['payment_method_id']
      },
      {
        name: 'idx_transactions_category_id',
        fields: ['category_id']
      },
      {
        name: 'idx_transactions_file_no',
        fields: ['file_no'] 
      },
      {
        name: 'idx_transactions_type',
        fields: ['type']
      }
    ]
  });
  return Transaction;
};