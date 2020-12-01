'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
        await queryInterface.createTable('sistema', {
            id: {
                primaryKey: true,
                type: Sequelize.DataTypes.INTEGER,
                allowNull: false
            },
            maintenance: {
                type: Sequelize.DataTypes.BOOLEAN,
                allowNull: false,
            },
            versao_api: {
                type: Sequelize.DataTypes.INTEGER,
                allowNull: false,
            },
            fator_hierarquico: {
                type: Sequelize.DataTypes.INTEGER,
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
        await queryInterface.dropTable('sistema', { transaction, });
        await transaction.commit();
    }
    catch(error) {
        await transaction.rollback();
        console.log(error);
    }
  }
};
