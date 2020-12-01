const uuid = require('uuid/v4');
const config = require('../config/config.js');

'use strict';

module.exports = (sequelize, DataTypes) => {
  const publicacoes_qualidades = sequelize.define('publicacoes_qualidades', {
        id: {
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4
        },
        id_publicacao: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        id_administrador: { //Administrador que analisou a nota da qualidade (!= null se o adm analisar também)
            type: DataTypes.UUID,
            allowNull: true,
        },
        id_gestor: { //Gestor que deu nota de qualidade
            type: DataTypes.UUID,
            allowNull: false,
        },
        qualidade: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        qualidade_mensagem: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
  }, {
      tableName: 'publicacoes_qualidades',
      underscored: true,
      underscoredAll: true,
      timestamps: true,
      paranoid: true,
  });
  publicacoes_qualidades.associate = function(models) {
    publicacoes_qualidades.belongsTo(models.publicacoes, {foreignKey: 'id_publicacao'});
  };
  //publicacoes_qualidades.sync();
  return publicacoes_qualidades;
};