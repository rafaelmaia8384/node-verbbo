'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {

    }
    catch(error) {
        await transaction.rollback();
        console.log(error);
    }
  },

  down: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {

    }
    catch(error) {
        await transaction.rollback();
        console.log(error);
    }
  }
};
