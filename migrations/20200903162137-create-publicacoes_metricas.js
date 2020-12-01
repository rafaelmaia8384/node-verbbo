'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
        await queryInterface.createTable('publicacoes_metricas', {
            id: {
                primaryKey: true,
                type: Sequelize.DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
            },
            id_publicacao: {
                type: Sequelize.DataTypes.UUID,
                allowNull: false,
            },
            ip: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false,
            },
            latitude: {
                type: Sequelize.DataTypes.DECIMAL(10, 8),
                allowNull: false,
            },
            longitude: {
                type: Sequelize.DataTypes.DECIMAL(11, 8),
                allowNull: false,
            },
            leitura_inicio: {
                type: Sequelize.DataTypes.DATE,
                allowNull: true,
            },
            leitura_fim: {
                type: Sequelize.DataTypes.DATE,
                allowNull: true,
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
        await queryInterface.addIndex('publicacoes_metricas', ['ip'], {
            fields: ['ip'],
            concurrently: true,
            unique: true,
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
        await queryInterface.dropTable('publicacoes_metricas', { transaction, });
        await transaction.commit();
    }
    catch(error) {
        await transaction.rollback();
        console.log(error);
    }
  }
};
