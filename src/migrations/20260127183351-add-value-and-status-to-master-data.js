'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Categories', 'value', {
      type: Sequelize.STRING,
      allowNull: true
    });
    await queryInterface.addColumn('Categories', 'status', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'active'
    });
    await queryInterface.addColumn('PaymentMethods', 'value', {
      type: Sequelize.STRING,
      allowNull: true
    });
    await queryInterface.addColumn('PaymentMethods', 'status', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'active'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Categories', 'value');
    await queryInterface.removeColumn('Categories', 'status');
    await queryInterface.removeColumn('PaymentMethods', 'value');
    await queryInterface.removeColumn('PaymentMethods', 'status');
  }
};
