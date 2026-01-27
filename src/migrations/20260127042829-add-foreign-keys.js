'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint('Transactions', {
      fields: ['categoryId'],
      type: 'foreign key',
      name: 'fk_transactions_category',
      references: {
        table: 'Categories',
        field: 'id'
      },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE'
    });

    await queryInterface.addConstraint('Transactions', {
      fields: ['paymentMethodId'],
      type: 'foreign key',
      name: 'fk_transactions_payment_method',
      references: {
        table: 'PaymentMethods',
        field: 'id'
      },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE'
    });

    await queryInterface.addConstraint('Transactions', {
      fields: ['createdBy'],
      type: 'foreign key',
      name: 'fk_transactions_user',
      references: {
        table: 'Users',
        field: 'id'
      },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE'
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('Transactions', 'fk_transactions_user');
    await queryInterface.removeConstraint('Transactions', 'fk_transactions_payment_method');
    await queryInterface.removeConstraint('Transactions', 'fk_transactions_category');
  }
};
