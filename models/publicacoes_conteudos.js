const uuid = require('uuid/v4');
const config = require('../config/config.js');

'use strict';

module.exports = (sequelize, DataTypes) => {
  const publicacoes_conteudos = sequelize.define('publicacoes_conteudos', {
        id: {
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4
        },
        id_publicacao: {
            type: DataTypes.UUID,
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
        img_descricao: {
            type: DataTypes.STRING,
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
            type: DataTypes.STRING,
            allowNull: false,
        },
        tags_soundex: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        content_json: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
  }, {
      tableName: 'publicacoes_conteudos',
      underscored: true,
      underscoredAll: true,
      timestamps: true,
      paranoid: true,
  });
  publicacoes_conteudos.associate = function(models) {
    publicacoes_conteudos.belongsTo(models.publicacoes, {foreignKey: 'id_publicacao'});
  };
  //publicacoes_conteudos.sync();
  return publicacoes_conteudos;
};