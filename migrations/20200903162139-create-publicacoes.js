'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
        await queryInterface.createTable('publicacoes', {
            id: {
                primaryKey: true,
                type: Sequelize.DataTypes.UUID,
                defaultValue: Sequelize.DataTypes.UUIDV4
            },
            id_administrador: {
                type: Sequelize.DataTypes.UUID,
                allowNull: false,
            },
            id_gestor: {
                type: Sequelize.DataTypes.UUID,
                allowNull: false,
            },
            id_supervisor: {
                type: Sequelize.DataTypes.UUID,
                allowNull: false,
            },
            id_usuario: {
                type: Sequelize.DataTypes.UUID,
                allowNull: false,
            },
            unixtime: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false,
            },
            slug: {
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
        await queryInterface.addIndex('publicacoes', ['unixtime'], {
            fields: ['unixtime'],
            concurrently: true,
            unique: false,
            transaction,
        }); 
        await queryInterface.addIndex('publicacoes', ['slug'], {
            fields: ['slug'],
            concurrently: true,
            unique: false,
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
        await queryInterface.dropTable('publicacoes', { transaction, });
        await transaction.commit();
    }
    catch(error) {
        await transaction.rollback();
        console.log(error);
    }
  }
};
