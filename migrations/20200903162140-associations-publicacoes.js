'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
        await queryInterface.addConstraint('publicacoes_analises', {
            type: 'foreign key',
            name: 'publicacoes_analises_id_publicacao_publicacoes_fk',
            fields: ['id_publicacao'],
            references: {
                table: 'publicacoes',
                field: 'id',
            },
            onDelete: 'cascade',
            onUpdate: 'cascade',
            transaction,
       });
       //publicacoes_conteudos belongsTo publicacoes
       await queryInterface.addConstraint('publicacoes_conteudos', {
            type: 'foreign key',
            name: 'publicacoes_conteudos_id_publicacao_publicacoes_fk',
            fields: ['id_publicacao'],
            references: {
                table: 'publicacoes',
                field: 'id',
            },
            onDelete: 'cascade',
            onUpdate: 'cascade',
            transaction,
       });
       //publicacoes_financeiros belongsTo publicacoes
       await queryInterface.addConstraint('publicacoes_financeiros', {
            type: 'foreign key',
            name: 'publicacoes_financeiros_id_publicacao_publicacoes_fk',
            fields: ['id_publicacao'],
            references: {
                table: 'publicacoes',
                field: 'id',
            },
            onDelete: 'cascade',
            onUpdate: 'cascade',
            transaction,
       });
       //publicacoes_metricas belongsTo publicacoes
       await queryInterface.addConstraint('publicacoes_metricas', {
            type: 'foreign key',
            name: 'publicacoes_metricas_id_publicacao_publicacoes_fk',
            fields: ['id_publicacao'],
            references: {
                table: 'publicacoes',
                field: 'id',
            },
            onDelete: 'cascade',
            onUpdate: 'cascade',
            transaction,
       });
       //publicacoes_qualidades belongsTo publicacoes
       await queryInterface.addConstraint('publicacoes_qualidades', {
            type: 'foreign key',
            name: 'publicacoes_qualidades_id_publicacao_publicacoes_fk',
            fields: ['id_publicacao'],
            references: {
                table: 'publicacoes',
                field: 'id',
            },
            onDelete: 'cascade',
            onUpdate: 'cascade',
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
        await queryInterface.removeConstraint('publicacoes_analises', 'publicacoes_analises_id_publicacao_publicacoes_fk', { transaction, });
        await queryInterface.removeConstraint('publicacoes_conteudos', 'publicacoes_conteudos_id_publicacao_publicacoes_fk', { transaction, });
        await queryInterface.removeConstraint('publicacoes_financeiros', 'publicacoes_financeiros_id_publicacao_publicacoes_fk', { transaction, });
        await queryInterface.removeConstraint('publicacoes_metricas', 'publicacoes_metricas_id_publicacao_publicacoes_fk', { transaction, });
        await queryInterface.removeConstraint('publicacoes_qualidades', 'publicacoes_qualidades_id_publicacao_publicacoes_fk', { transaction, });
        await transaction.commit();
    }
    catch(error) {
        await transaction.rollback();
        console.log(error);
    }
  }
};
