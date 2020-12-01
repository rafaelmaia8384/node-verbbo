const configVerbbo = require('../config/configVerbbo.js');

'use strict';

module.exports = (sequelize, DataTypes) => {
  const sistema_permissoes = sequelize.define('sistema_permissoes', {
        id: {
            primaryKey: true,
            type: DataTypes.INTEGER,
            allowNull: false
        },
        nome: {
            type: DataTypes.STRING,
            allowNull: false,
        },
  }, {
      tableName: 'sistema_permissoes',
      timestamps: false,
  });
//   sistema_permissoes.sync({ force: true }).then(async () => {
//     const permissoes = configVerbbo.permissoes;
//     for (var i = 0; i < permissoes.length; i++) {
//       await sistema_permissoes.create(permissoes[i]); 
//     }
//   });
  return sistema_permissoes;
};