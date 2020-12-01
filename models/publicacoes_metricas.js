const uuid = require('uuid/v4');
const config = require('../config/config.js');

'use strict';

module.exports = (sequelize, DataTypes) => {
  const publicacoes_metricas = sequelize.define('publicacoes_metricas', {
        id: {
            primaryKey: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
        },
        id_publicacao: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        ip: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        latitude: {
            type: DataTypes.DECIMAL(10, 8),
            allowNull: false,
        },
        longitude: {
            type: DataTypes.DECIMAL(11, 8),
            allowNull: false,
        },
        leitura_inicio: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        leitura_fim: {
            type: DataTypes.DATE,
            allowNull: true,
        },
  }, {
      tableName: 'publicacoes_metricas',
      underscored: true,
      underscoredAll: true,
      timestamps: true,
      paranoid: true,
  });
  publicacoes_metricas.associate = function(models) {
    publicacoes_metricas.belongsTo(models.publicacoes, {foreignKey: 'id_publicacao'});
  };
  //publicacoes_metricas.sync();
  return publicacoes_metricas;
};