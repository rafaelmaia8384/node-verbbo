'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
        await queryInterface.createTable('publicacoes_analises', {
            id: {
                primaryKey: true,
                type: Sequelize.DataTypes.UUID,
                defaultValue: Sequelize.DataTypes.UUIDV4
            },
            id_publicacao: {
                type: Sequelize.DataTypes.UUID,
                allowNull: false,
            },
            id_analisador1: { //Análise de primeira etapa: Supervisor de edição
                type: Sequelize.DataTypes.UUID,
                allowNull: true,
            },
            id_analisador2: { //Análise de segunda etapa pelos gestores
                type: Sequelize.DataTypes.UUID,
                allowNull: true,
            },
            qualidade: {
                type: Sequelize.DataTypes.INTEGER,
                allowNull: true,
            },
            analise_concluida: {
                type: Sequelize.DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
            analise_aprovada: {
                type: Sequelize.DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
            analise_mensagem: {
                type: Sequelize.DataTypes.TEXT,
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
        await queryInterface.dropTable('publicacoes_analises',{ transaction, });
        await transaction.commit();
    }
    catch(error) {
        await transaction.rollback();
        console.log(error);
    }
  }
};
