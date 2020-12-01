'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
        await queryInterface.createTable('usuarios_analises', {
            id: {
                primaryKey: true,
                type: Sequelize.DataTypes.UUID,
                defaultValue: Sequelize.DataTypes.UUIDV4
            },
            id_usuario: {
                type: Sequelize.DataTypes.UUID,
                allowNull: false,
            },
            id_analisador1: { //Análise de primeira etapa: usuário que fez o convite confirma que o usuário foi convidado por ele
                type: Sequelize.DataTypes.UUID,
                allowNull: true,
            },
            id_analisador2: { //Análise de segunda etapa pelos administradores
                type: Sequelize.DataTypes.UUID,
                allowNull: true,
            },
            path_image: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false,
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
            mensagem: {
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
        await queryInterface.dropTable('usuarios_analises', { transaction, });
        await transaction.commit();
    }
    catch(error) {
        await transaction.rollback();
        console.log(error);
    }
  }
};
