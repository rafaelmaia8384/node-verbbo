const uuid = require('uuid/v4');
const configVerbbo = require('../config/configVerbbo.js');
const config = require('../config/config.js');

'use strict';

module.exports = (sequelize, DataTypes) => {
  const usuarios = sequelize.define('usuarios', {
        id: {
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4
        },
        id_superior: {
            type: DataTypes.UUID,
            allowNull: true,
        },
        limite_hierarquico: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: configVerbbo.fatorHierarquico,
        },
        convite_ceo: {
            type: DataTypes.UUID,
            allowNull: false,
            defaultValue: DataTypes.UUIDV4
        },
        convite_administrador: {
            type: DataTypes.UUID,
            allowNull: false,
            defaultValue: DataTypes.UUIDV4
        },
        convite_gestor: {
            type: DataTypes.UUID,
            allowNull: false,
            defaultValue: DataTypes.UUIDV4
        },
        convite_supervisor: {
            type: DataTypes.UUID,
            allowNull: false,
            defaultValue: DataTypes.UUIDV4
        },
        convite_editor: {
            type: DataTypes.UUID,
            allowNull: false,
            defaultValue: DataTypes.UUIDV4
        },
        nome: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        resumo: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        nome_completo: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        cpf: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        data_nascimento: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        telefone: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
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
        },
        bloqueado: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        bloqueado_motivo: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
  }, {
      tableName: 'usuarios',
      underscored: true,
      underscoredAll: true,
      timestamps: true,
      paranoid: true,
  });
  usuarios.associate = function(models) {
    usuarios.hasMany(models.publicacoes, {foreignKey: 'id_usuario', as: 'publicacoes'});
    usuarios.hasMany(models.usuarios_permissoes, {foreignKey: 'id_usuario', as: 'permissoes'});
    usuarios.hasMany(models.usuarios_avisos, {foreignKey: 'id_usuario', as: 'avisos'});
    usuarios.hasOne(models.usuarios_analises, {foreignKey: 'id_usuario', as: 'analise'});
  };
  //usuarios.sync();
  return usuarios;
};