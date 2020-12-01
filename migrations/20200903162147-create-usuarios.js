'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
        await queryInterface.createTable('usuarios', {
            id: {
                primaryKey: true,
                type: Sequelize.DataTypes.UUID,
                defaultValue: Sequelize.DataTypes.UUIDV4
            },
            id_superior: {
                type: Sequelize.DataTypes.UUID,
                allowNull: true,
            },
            limite_hierarquico: {
                type: Sequelize.DataTypes.INTEGER,
                allowNull: false,
            },
            convite_ceo: {
                type: Sequelize.DataTypes.UUID,
                allowNull: false,
                defaultValue: Sequelize.DataTypes.UUIDV4
            },
            convite_administrador: {
                type: Sequelize.DataTypes.UUID,
                allowNull: false,
                defaultValue: Sequelize.DataTypes.UUIDV4
            },
            convite_gestor: {
                type: Sequelize.DataTypes.UUID,
                allowNull: false,
                defaultValue: Sequelize.DataTypes.UUIDV4
            },
            convite_supervisor: {
                type: Sequelize.DataTypes.UUID,
                allowNull: false,
                defaultValue: Sequelize.DataTypes.UUIDV4
            },
            convite_editor: {
                type: Sequelize.DataTypes.UUID,
                allowNull: false,
                defaultValue: Sequelize.DataTypes.UUIDV4
            },
            nome: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false,
            },
            resumo: {
                type: Sequelize.DataTypes.TEXT,
                allowNull: false,
            },
            nome_completo: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false,
            },
            cpf: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false,
            },
            data_nascimento: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false,
            },
            telefone: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false,
            },
            email: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false,
            },
            senha_hash: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false,
            },
            path_image: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false,
            },
            bloqueado: {
                type: Sequelize.DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
            bloqueado_motivo: {
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
        await queryInterface.addIndex('usuarios', ['cpf'], {
            fields: ['cpf'],
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
        await queryInterface.dropTable('usuarios', { transaction, });
        await transaction.commit();
    }
    catch(error) {
        await transaction.rollback();
        console.log(error);
    }
  }
};
