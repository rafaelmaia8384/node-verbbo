const uuid = require('uuid/v4');
const config = require('../config/config.js');

'use strict';

module.exports = (sequelize, DataTypes) => {
  const portais_metricas = sequelize.define('portais_metricas', {
        id: {
            primaryKey: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
        },
        id_portal: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        ip: {
            type: DataTypes.STRING(16),
            allowNull: false,
        },
  }, {
      tableName: 'portais_metricas',
      underscored: true,
      underscoredAll: true,
      timestamps: true,
      paranoid: true,
      indexes: [
         { fields: ['ip'] },
      ],
  });
  portais_metricas.associate = function(models) {
    portais_metricas.belongsTo(models.portais, {foreignKey: 'id_portal'});
  };
  //portais_metricas.sync();
  return portais_metricas;
};