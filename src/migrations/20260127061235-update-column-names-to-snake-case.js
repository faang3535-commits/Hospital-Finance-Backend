'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.renameColumn('Transactions', 'fileNo', 'file_no');
    await queryInterface.renameColumn('Transactions', 'patientName', 'patient_name');
    await queryInterface.renameColumn('Transactions', 'payeeName', 'payee_name');
    await queryInterface.renameColumn('Transactions', 'transactionDate', 'transaction_date');
    await queryInterface.renameColumn('Transactions', 'categoryId', 'category_id');
    await queryInterface.renameColumn('Transactions', 'paymentMethodId', 'payment_method_id');
    await queryInterface.renameColumn('Transactions', 'createdBy', 'created_by');
    await queryInterface.renameColumn('Transactions', 'createdAt', 'created_at');
    await queryInterface.renameColumn('Transactions', 'updatedAt', 'updated_at');

    await queryInterface.renameColumn('Users', 'createdAt', 'created_at');
    await queryInterface.renameColumn('Users', 'updatedAt', 'updated_at');

    await queryInterface.renameColumn('Categories', 'createdAt', 'created_at');
    await queryInterface.renameColumn('Categories', 'updatedAt', 'updated_at');

    await queryInterface.renameColumn('PaymentMethods', 'createdAt', 'created_at');
    await queryInterface.renameColumn('PaymentMethods', 'updatedAt', 'updated_at');

    await queryInterface.addIndex('Users', ['email'], {
      name: 'idx_users_email'
    });

    await queryInterface.addIndex('Transactions', ['transaction_date'], {
      name: 'idx_transactions_transaction_date'
    });

    await queryInterface.addIndex('Transactions', ['payment_method_id'], {
      name: 'idx_transactions_payment_method_id'
    });

    await queryInterface.addIndex('Transactions', ['category_id'], {
      name: 'idx_transactions_category_id'
    });

    await queryInterface.addIndex('Transactions', ['file_no'], {
      name: 'idx_transactions_file_no'
    });

    await queryInterface.addIndex('Transactions', ['type'], {
      name: 'idx_transactions_type'
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeIndex('Users', 'idx_users_email');

    await queryInterface.removeIndex('Transactions', 'idx_transactions_transaction_date');

    await queryInterface.removeIndex('Transactions', 'idx_transactions_payment_method_id');

    await queryInterface.removeIndex('Transactions', 'idx_transactions_category_id');

    await queryInterface.removeIndex('Transactions', 'idx_transactions_file_no');

    await queryInterface.removeIndex('Transactions', 'idx_transactions_type');

    await queryInterface.renameColumn('Transactions', 'file_no', 'fileNo');
    await queryInterface.renameColumn('Transactions', 'patient_name', 'patientName');
    await queryInterface.renameColumn('Transactions', 'payee_name', 'payeeName');
    await queryInterface.renameColumn('Transactions', 'transaction_date', 'transactionDate');
    await queryInterface.renameColumn('Transactions', 'category_id', 'categoryId');
    await queryInterface.renameColumn('Transactions', 'payment_method_id', 'paymentMethodId');
    await queryInterface.renameColumn('Transactions', 'created_by', 'createdBy');
    await queryInterface.renameColumn('Transactions', 'created_at', 'createdAt');
    await queryInterface.renameColumn('Transactions', 'updated_at', 'updatedAt');

    await queryInterface.renameColumn('Users', 'created_at', 'createdAt');
    await queryInterface.renameColumn('Users', 'updated_at', 'updatedAt');

    await queryInterface.renameColumn('Categories', 'created_at', 'createdAt');
    await queryInterface.renameColumn('Categories', 'updated_at', 'updatedAt');

    await queryInterface.renameColumn('PaymentMethods', 'created_at', 'createdAt');
    await queryInterface.renameColumn('PaymentMethods', 'updated_at', 'updatedAt');
  }
};
