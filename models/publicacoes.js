const uuid = require('uuid/v4');
const config = require('../config/config.js');

'use strict';

module.exports = (sequelize, DataTypes) => {
  const publicacoes = sequelize.define('publicacoes', {
        id: {
            primaryKey: true,
            type: DataTypes.STRING,
            allowNull: false,
        },
        id_usuario: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        id_portal: {
            type: DataTypes.STRING,
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
        fonte: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        fonte_soundex: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        titulo: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        titulo_soundex: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        sub_titulo: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        sub_titulo_soundex: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        categorias: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        categorias_soundex: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        tags: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        tags_soundex: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        content_json: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
  }, {
      tableName: 'publicacoes',
      underscored: true,
      underscoredAll: true,
      timestamps: true,
      paranoid: true,
      indexes: [
        { type: 'FULLTEXT', fields: ['fonte_soundex'] },
        { type: 'FULLTEXT', fields: ['titulo_soundex'] },
        { type: 'FULLTEXT', fields: ['sub_titulo_soundex'] },
        { type: 'FULLTEXT', fields: ['categorias_soundex'] },
        { type: 'FULLTEXT', fields: ['tags_soundex'] },
      ],
  });
  publicacoes.associate = function(models) {
    publicacoes.belongsTo(models.usuarios, {foreignKey: 'id_usuario'});
    publicacoes.hasMany(models.publicacoes_metricas, {foreignKey: 'id_publicacao', as: 'publicacoes_metricas'});
  };
  //publicacoes.sync();
  return publicacoes;
};