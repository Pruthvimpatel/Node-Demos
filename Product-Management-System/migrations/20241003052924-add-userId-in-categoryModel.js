/* eslint-disable no-undef */
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Start a transaction
    await queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.addColumn(
        'categories',
        'userId',
        {
          type: Sequelize.UUID,
          allowNull: true,
        },
        { transaction }
      );
    });
  },

  down: async (queryInterface) => {
    await queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.removeColumn('categories', 'userId', { transaction });
    });
  }
};
