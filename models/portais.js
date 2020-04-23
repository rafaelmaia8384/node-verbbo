const uuid = require('uuid/v4');
const config = require('../config/config.js');

'use strict';

module.exports = (sequelize, DataTypes) => {
  const portais = sequelize.define('portais', {
        id: {
            primaryKey: true,
            type: DataTypes.STRING,
            allowNull: false,
        },
        id_usuario: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        portal_nome: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        portal_resumo: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        path_image: {
            type: DataTypes.STRING,
            allowNull: false,
            get() { 
                const image = this.getDataValue('path_image');
                return `https://${config.storage.bucketName}.${config.storage.endPoint}/${config.storage.folderName}/${image}`;
            },
        },
  }, {
      tableName: 'portais',
      underscored: true,
      underscoredAll: true,
      timestamps: true,
      paranoid: true,
      indexes: [
         { fields: ['portal_nome'] },
      ],
  });
  portais.associate = function(models) {
    portais.belongsTo(models.usuarios, {foreignKey: 'id_usuario'});
    portais.hasMany(models.portais_metricas, {foreignKey: 'id_portal', as: 'portais_metricas'});
  };
  //portais.sync();
  return portais;
};