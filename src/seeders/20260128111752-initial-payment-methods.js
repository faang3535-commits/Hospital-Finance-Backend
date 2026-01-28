'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('PaymentMethods', [
      {
        name: 'Cash',
        type: 'Both',
        value: 'cash',
        status: 'active',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Bank Transfer',
        type: 'Both',
        value: 'bank_transfer',
        status: 'active',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Credit Card',
        type: 'Both',
        value: 'credit_card',
        status: 'active',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Debit Card',
        type: 'Both',
        value: 'debit_card',
        status: 'active',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'UPI / GPay',
        type: 'Both',
        value: 'upi',
        status: 'active',
        created_at: new Date(),
        updated_at: new Date(),
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('PaymentMethods', null, {});
  }
};
