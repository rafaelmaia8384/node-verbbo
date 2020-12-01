'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
        await queryInterface.createTable('sistema_permissoes', {
            id: {
                primaryKey: true,
                type: Sequelize.DataTypes.INTEGER,
                allowNull: false
            },
            nome: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false,
            },
            created_at: {
                type: Sequelize.DataTypes.DATE,
                allowNull: true,
            },
            updated_at: {
                type: Sequelize.DataTypes.DATE,
                allowNull: true,
            },
            deleted_at: {
                type: Sequelize.DataTypes.DATE,
                allowNull: true,
            },
        },
        {
            transaction,
        });
        await transaction.commit();
    }
    catch(error) {
        await transaction.rollback();
        console.log(error);
    }
  },

  down: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
        await queryInterface.dropTable('sistema_permissoes', { transaction, });
        await transaction.commit();
    }
    catch(error) {
        await transaction.rollback();
        console.log(error);
    }
  }
};
