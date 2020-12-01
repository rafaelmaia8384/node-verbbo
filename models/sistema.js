const configVerbbo = require('../config/configVerbbo.js');

'use strict';

module.exports = (sequelize, DataTypes) => {
  const sistema = sequelize.define('sistema', {
        id: {
            primaryKey: true,
            type: DataTypes.INTEGER,
            allowNull: false
        },
        maintenance: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        versao_api: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        fator_hierarquico: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
  }, {
      tableName: 'sistema',
      underscored: true,
      underscoredAll: true,
      timestamps: true,
      paranoid: true,
  });
  sistema.associate = function(models) {
      //nenhuma associação
  };
//   sistema.sync({ force: true }).then(() => {
//     sistema.create({ 
//         id: 1, 
//         maintenance: configVerbbo.maintenance, 
//         versao_api: configVerbbo.versaoAtual,
//         fator_hierarquico: configVerbbo.fatorHierarquico,
//     });
//   });
  return sistema;
};