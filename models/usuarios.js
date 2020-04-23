const uuid = require('uuid/v4');
const config = require('../config/config.js');

'use strict';

module.exports = (sequelize, DataTypes) => {
  const usuarios = sequelize.define('usuarios', {
        id: {
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4
        },
        publicante_nome: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        publicante_resumo: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        publicante_nome_completo: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        publicante_cpf: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        publicante_data_nascimento: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        publicante_telefone: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email_verificado: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        senha_hash: {
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
        }
  }, {
      tableName: 'usuarios',
      underscored: true,
      underscoredAll: true,
      timestamps: true,
      paranoid: true,
      indexes: [
         { fields: ['publicante_cpf'] },
      ],
  });
  usuarios.associate = function(models) {
    usuarios.hasMany(models.portais, {foreignKey: 'id_usuario', as: 'portais'});
    usuarios.hasMany(models.publicacoes, {foreignKey: 'id_usuario', as: 'publicacoes'});
  };
  //usuarios.sync();
  return usuarios;
};