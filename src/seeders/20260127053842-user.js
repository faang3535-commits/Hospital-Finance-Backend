'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('Users', [{
      name: 'Super Admin',
      email: 'superadmin@gmail.com',
      password: '$2b$10$KhMvT6pkIIaFZRqeEmFpR.L5/Lh1xOnCeeK80M.q3rduG24SDXrPC',
      role: 'SuperAdmin',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      name: 'Admin',
      email: 'admin@gmail.com',
      password: '$2b$10$YLEoUBFhIT1Ora0k2ybvJuadLCtLxz5kcZDZT/cqpAInsdIT2TmAy',
      role: 'Admin',
      created_at: new Date(),
      updated_at: new Date(),
    }], {});

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
