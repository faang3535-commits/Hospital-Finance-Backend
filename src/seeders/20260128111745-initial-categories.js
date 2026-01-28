'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Categories', [
      {
        name: 'Consultation Fee',
        type: 'Income',
        value: 'consultation',
        status: 'active',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Laboratory Test',
        type: 'Income',
        value: 'lab_test',
        status: 'active',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Pharmacy',
        type: 'Both',
        value: 'pharmacy',
        status: 'active',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Surgery',
        type: 'Income',
        value: 'surgery',
        status: 'active',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Medical Supplies',
        type: 'Expense',
        value: 'supplies',
        status: 'active',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Staff Salary',
        type: 'Expense',
        value: 'salary',
        status: 'active',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Electricity Bill',
        type: 'Expense',
        value: 'electricity',
        status: 'active',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Maintenance',
        type: 'Expense',
        value: 'maintenance',
        status: 'active',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Office Supplies',
        type: 'Expense',
        value: 'office_supplies',
        status: 'active',
        created_at: new Date(),
        updated_at: new Date(),
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Categories', null, {});
  }
};
