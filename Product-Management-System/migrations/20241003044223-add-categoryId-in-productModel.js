/* eslint-disable no-undef */
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.addColumn(
        'products',
        'categoryId',
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
      await queryInterface.removeColumn('products', 'categoryId', { transaction });
    });
  }
};
