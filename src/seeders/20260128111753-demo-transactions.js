'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const users = await queryInterface.sequelize.query(
      'SELECT id FROM "Users" LIMIT 1;'
    );
    const categories = await queryInterface.sequelize.query(
      'SELECT id, type FROM "Categories";'
    );
    const paymentMethods = await queryInterface.sequelize.query(
      'SELECT id FROM "PaymentMethods" LIMIT 1;'
    );

    const userId = users[0][0]?.id;
    const paymentMethodId = paymentMethods[0][0]?.id;
    
    const findCat = (type) => categories[0].find(c => c.type === type)?.id || 1;

    if (!userId || !paymentMethodId) {
       console.log('Skipping transactions seed: No users or payment methods found.');
       return;
    }

    await queryInterface.bulkInsert('Transactions', [
      {
        file_no: 'FILE-101',
        patient_name: 'John Doe',
        payee_name: 'Self',
        amount: 1500.00,
        transaction_date: new Date(),
        type: 'Income',
        category_id: findCat('Income'),
        payment_method_id: paymentMethodId,
        created_by: userId,
        notes: 'Consultation fee for John',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        file_no: 'FILE-102',
        patient_name: 'Jane Smith',
        payee_name: 'Self',
        amount: 25000.00,
        transaction_date: new Date(new Date().setDate(new Date().getDate() - 1)),
        type: 'Income',
        category_id: findCat('Income'),
        payment_method_id: paymentMethodId,
        created_by: userId,
        notes: 'Minor surgery fee',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        file_no: null,
        patient_name: null,
        payee_name: 'Electricity Board',
        amount: 5000.00,
        transaction_date: new Date(),
        type: 'Expense',
        category_id: findCat('Expense'),
        payment_method_id: paymentMethodId,
        created_by: userId,
        notes: 'Monthly power bill',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        file_no: null,
        patient_name: null,
        payee_name: 'Medical Gears Inc',
        amount: 12000.00,
        transaction_date: new Date(new Date().setDate(new Date().getDate() - 2)),
        type: 'Expense',
        category_id: findCat('Expense'),
        payment_method_id: paymentMethodId,
        created_by: userId,
        notes: 'Emergency supplies audit',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        file_no: 'FILE-103',
        patient_name: 'Robert Wilson',
        payee_name: 'Self',
        amount: 500.00,
        transaction_date: new Date(),
        type: 'Income',
        category_id: findCat('Both'),
        payment_method_id: paymentMethodId,
        created_by: userId,
        notes: 'Pharmacy purchase',
        created_at: new Date(),
        updated_at: new Date(),
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Transactions', null, {});
  }
};
