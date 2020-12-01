const uuid = require('uuid/v4');
const config = require('../config/config.js');

'use strict';

module.exports = (sequelize, DataTypes) => {
  const usuarios_analises = sequelize.define('usuarios_analises', {
        id: {
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4
        },
        id_usuario: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        id_analisador1: { //Análise de primeira etapa: usuário que fez o convite confirma que o usuário foi convidado por ele
            type: DataTypes.UUID,
            allowNull: true,
        },
        id_analisador2: { //Análise de segunda etapa pelos administradores
            type: DataTypes.UUID,
            allowNull: true,
        },
        path_image: {
            type: DataTypes.STRING,
            allowNull: false,
            get() { 
                const image = this.getDataValue('path_image');
                return `https://${config.storage.bucketName}.${config.storage.endPoint}/${config.storage.folderName}/${image}`;
            },
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
        mensagem: {
            type: DataTypes.TEXT,
            allowNull: true,
        }
  }, {
      tableName: 'usuarios_analises',
      underscored: true,
      underscoredAll: true,
      timestamps: true,
      paranoid: true,
  });
  usuarios_analises.associate = function(models) {
    usuarios_analises.belongsTo(models.usuarios, {foreignKey: 'id_usuario'});
  };
  //usuarios_analises.sync();
  return usuarios_analises;
};