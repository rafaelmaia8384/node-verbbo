'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
        await queryInterface.createTable('usuarios_permissoes', {
            id: {
                primaryKey: true,
                type: Sequelize.DataTypes.INTEGER,
                autoIncrement: true,
                allowNull: false
            },
            id_usuario: {
                type: Sequelize.DataTypes.UUID,
                allowNull: false,
            },
            id_permissao: {
                type: Sequelize.DataTypes.INTEGER,
                allowNull: false,
            },
            created_at: {
                type: Sequelize.Sequelize.DataTypes.DATE,
                allowNull: true,
            },
            updated_at: {
                type: Sequelize.Sequelize.DataTypes.DATE,
                allowNull: true,
            },
            deleted_at: {
                type: Sequelize.Sequelize.DataTypes.DATE,
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
        await queryInterface.dropTable('usuarios_permissoes', { transaction, });
        await transaction.commit();
    }
    catch(error) {
        await transaction.rollback();
        console.log(error);
    }
  }
};
