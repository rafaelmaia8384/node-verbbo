'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
        await queryInterface.createTable('usuarios_avisos', {
            id: {
                primaryKey: true,
                type: Sequelize.DataTypes.UUID,
                defaultValue: Sequelize.DataTypes.UUIDV4
            },
            id_usuario: {
                type: Sequelize.DataTypes.UUID,
                allowNull: true,
            },
            path_image: {
                type: Sequelize.DataTypes.STRING,
                allowNull: true,
            },
            tipo: {
                type: Sequelize.DataTypes.INTEGER,
                allowNull: false,
            },
            id_objeto: {
                type: Sequelize.DataTypes.UUID,
                allowNull: true,
            },
            titulo: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false,
            },
            sub_titulo: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false,
            },
            mensagem: {
                type: Sequelize.DataTypes.TEXT,
                allowNull: true,
            },
            recebido: {
                type: Sequelize.DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
            visto: {
                type: Sequelize.DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
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
        await queryInterface.dropTable('usuarios_avisos', { transaction, });
        await transaction.commit();
    }
    catch(error) {
        await transaction.rollback();
        console.log(error);
    }
  }
};
