const uuid = require('uuid/v4');
const config = require('../config/config.js');

'use strict';

module.exports = (sequelize, DataTypes) => {
  const publicacoes_financeiros = sequelize.define('publicacoes_financeiros', {
        id: {
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4
        },
        id_publicacao: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        meta_visualizacoes: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        meta_valor: {
            type: DataTypes.DECIMAL(10,2),
            allowNull: false,
        },
        pagamento_efetuado: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        pagamento_comprovante: {
            type: DataTypes.STRING,
            allowNull: true,
        },
  }, {
      tableName: 'publicacoes_financeiros',
      underscored: true,
      underscoredAll: true,
      timestamps: true,
      paranoid: true,
  });
  publicacoes_financeiros.associate = function(models) {
    publicacoes_financeiros.belongsTo(models.publicacoes, {foreignKey: 'id_publicacao'});
  };
  //publicacoes_financeiros.sync();
  return publicacoes_financeiros;
};