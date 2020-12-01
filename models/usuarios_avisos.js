const uuid = require('uuid/v4');
const config = require('../config/config.js');

'use strict';

module.exports = (sequelize, DataTypes) => {
  const usuarios_avisos = sequelize.define('usuarios_avisos', {
        id: {
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4
        },
        id_usuario: {
            type: DataTypes.UUID,
            allowNull: true,
        },
        path_image: {
            type: DataTypes.STRING,
            allowNull: true,
            get() { 
                const image = this.getDataValue('path_image');
                return image ? `https://${config.storage.bucketName}.${config.storage.endPoint}/${config.storage.folderName}/${image}` : null;
            },
        },
        tipo: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        id_objeto: {
            type: DataTypes.UUID,
            allowNull: true,
        },
        titulo: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        sub_titulo: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        mensagem: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        recebido: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        visto: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
  }, {
      tableName: 'usuarios_avisos',
      underscored: true,
      underscoredAll: true,
      timestamps: true,
      paranoid: true,
  });
  usuarios_avisos.associate = function(models) {
    usuarios_avisos.belongsTo(models.usuarios, {foreignKey: 'id_usuario'});
  };
  //usuarios_avisos.sync();
  return usuarios_avisos;
};