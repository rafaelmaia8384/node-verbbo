'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
        await queryInterface.createTable('publicacoes_qualidades', {
            id: {
                primaryKey: true,
                type: Sequelize.DataTypes.UUID,
                defaultValue: Sequelize.DataTypes.UUIDV4
            },
            id_publicacao: {
                type: Sequelize.DataTypes.UUID,
                allowNull: false,
            },
            id_administrador: { //Administrador que analisou a nota da qualidade (!= null se o adm analisar também)
                type: Sequelize.DataTypes.UUID,
                allowNull: true,
            },
            id_gestor: { //Gestor que deu nota de qualidade
                type: Sequelize.DataTypes.UUID,
                allowNull: false,
            },
            qualidade: {
                type: Sequelize.DataTypes.INTEGER,
                allowNull: true,
            },
            qualidade_mensagem: {
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
        await queryInterface.dropTable('publicacoes_qualidades', { transaction, });
        await transaction.commit();
    }
    catch(error) {
        await transaction.rollback();
        console.log(error);
    }
  }
};
