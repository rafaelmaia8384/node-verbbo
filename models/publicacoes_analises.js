const uuid = require('uuid/v4');
const config = require('../config/config.js');

'use strict';

module.exports = (sequelize, DataTypes) => {
  const publicacoes_analises = sequelize.define('publicacoes_analises', {
        id: {
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4
        },
        id_publicacao: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        id_analisador1: { //Análise de primeira etapa: Supervisor de edição
            type: DataTypes.UUID,
            allowNull: true,
        },
        id_analisador2: { //Análise de segunda etapa pelos gestores
            type: DataTypes.UUID,
            allowNull: true,
        },
        qualidade: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        analise_concluida: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        analise_aprovada: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        analise_mensagem: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
  }, {
      tableName: 'publicacoes_analises',
      underscored: true,
      underscoredAll: true,
      timestamps: true,
      paranoid: true,
  });
  publicacoes_analises.associate = function(models) {
    publicacoes_analises.belongsTo(models.publicacoes, {foreignKey: 'id_publicacao'});
  };
  //publicacoes_analises.sync();
  return publicacoes_analises;
};