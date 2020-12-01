'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
        await queryInterface.createTable('publicacoes_financeiros', {
            id: {
                primaryKey: true,
                type: Sequelize.DataTypes.UUID,
                defaultValue: Sequelize.DataTypes.UUIDV4
            },
            id_publicacao: {
                type: Sequelize.DataTypes.UUID,
                allowNull: false,
            },
            meta_visualizacoes: {
                type: Sequelize.DataTypes.INTEGER,
                allowNull: false,
            },
            meta_valor: {
                type: Sequelize.DataTypes.DECIMAL(10,2),
                allowNull: false,
            },
            pagamento_efetuado: {
                type: Sequelize.DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
            pagamento_comprovante: {
                type: Sequelize.DataTypes.STRING,
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
        await queryInterface.dropTable('publicacoes_financeiros', { transaction, });
        await transaction.commit();
    }
    catch(error) {
        await transaction.rollback();
        console.log(error);
    }
  }
};
