'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('Users', [{
      name: 'Super Admin',
      email: 'superadmin@gmail.com',
      password: '$2b$10$Qtdt78S9EvNLvbtBnDsoLeVHedDE1dFrEeU/7ZV2EWJIt41FS6j7y',
      role: 'SuperAdmin',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      name: 'Admin',
      email: 'admin@gmail.com',
      password: '$2b$10$8NtcCJJZR9vKHmQ/ANANQ..vHLRb3N5u1rRYJi769nL7sNFIokjaS',
      role: 'Admin',
      created_at: new Date(),
      updated_at: new Date(),
    }], {});

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
