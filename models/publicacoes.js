const uuid = require('uuid/v4');
const config = require('../config/config.js');

'use strict';

module.exports = (sequelize, DataTypes) => {
  const publicacoes = sequelize.define('publicacoes', {
        id: {
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4
        },
        id_administrador: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        id_gestor: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        id_supervisor: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        id_usuario: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        unixtime: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        slug: {
            type: DataTypes.STRING,
            allowNull: false,
        },
  }, {
      tableName: 'publicacoes',
      underscored: true,
      underscoredAll: true,
      timestamps: true,
      paranoid: true,
  });
  publicacoes.associate = function(models) {
    publicacoes.belongsTo(models.usuarios, {foreignKey: 'id_usuario'});
    publicacoes.hasOne(models.publicacoes_analises, {foreignKey: 'id_publicacao', as: 'analise'});
    publicacoes.hasOne(models.publicacoes_qualidades, {foreignKey: 'id_publicacao', as: 'qualidade'});
    publicacoes.hasMany(models.publicacoes_conteudos, {foreignKey: 'id_publicacao', as: 'conteudos'});
    publicacoes.hasMany(models.publicacoes_metricas, {foreignKey: 'id_publicacao', as: 'metricas'});
    publicacoes.hasMany(models.publicacoes_financeiros, {foreignKey: 'id_publicacao', as: 'financeiros'});
  };
  //publicacoes.sync();
  return publicacoes;
};