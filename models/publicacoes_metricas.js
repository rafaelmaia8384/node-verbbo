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
            type: DataTypes.STRING,
            allowNull: false,
        },
        ip: {
            type: DataTypes.STRING(16),
            allowNull: false,
        },
  }, {
      tableName: 'publicacoes_metricas',
      underscored: true,
      underscoredAll: true,
      timestamps: true,
      paranoid: true,
      indexes: [
         { fields: ['ip'] },
      ],
  });
  publicacoes_metricas.associate = function(models) {
    publicacoes_metricas.belongsTo(models.publicacoes, {foreignKey: 'id_publicacao'});
  };
  //publicacoes_metricas.sync();
  return publicacoes_metricas;
};