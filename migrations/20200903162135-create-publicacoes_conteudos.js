'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
        await queryInterface.createTable('publicacoes_conteudos', {
            id: {
                primaryKey: true,
                type: Sequelize.Sequelize.DataTypes.UUID,
                defaultValue: Sequelize.DataTypes.UUIDV4
            },
            id_publicacao: {
                type: Sequelize.DataTypes.UUID,
                allowNull: false,
            },
            path_image: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false,
            },
            img_descricao: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false,
            },
            titulo: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false,
            },
            titulo_soundex: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false,
            },
            sub_titulo: {
                type: Sequelize.DataTypes.TEXT,
                allowNull: true,
            },
            sub_titulo_soundex: {
                type: Sequelize.DataTypes.TEXT,
                allowNull: true,
            },
            categorias: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false,
            },
            categorias_soundex: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false,
            },
            tags: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false,
            },
            tags_soundex: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false,
            },
            content_json: {
                type: Sequelize.DataTypes.TEXT,
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
        }, {
            transaction,
        });
        await queryInterface.addIndex('publicacoes_conteudos', ['titulo_soundex'], {
            fields: ['titulo_soundex'],
            concurrently: true,
            type: 'FULLTEXT',
            transaction,
        });
        await queryInterface.addIndex('publicacoes_conteudos', ['sub_titulo_soundex'], {
            fields: ['sub_titulo_soundex'],
            concurrently: true,
            type: 'FULLTEXT',
            transaction,
        });
        await queryInterface.addIndex('publicacoes_conteudos', ['categorias_soundex'], {
            fields: ['categorias_soundex'],
            concurrently: true,
            type: 'FULLTEXT',
            transaction,
        });
        await queryInterface.addIndex('publicacoes_conteudos', ['tags_soundex'], {
            fields: ['tags_soundex'],
            concurrently: true,
            type: 'FULLTEXT',
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
        await queryInterface.dropTable('publicacoes_conteudos', { transaction, });
        await transaction.commit();
    }
    catch(error) {
        await transaction.rollback();
        console.log(error);
    }
  }
};
