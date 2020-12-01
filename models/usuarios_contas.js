const uuid = require('uuid/v4');

'use strict';

module.exports = (sequelize, DataTypes) => {
  const usuarios_contas = sequelize.define('usuarios_contas', {
        id: {
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4
        },
        id_usuario: {
            type: DataTypes.UUID,
            allowNull: false,
        },
  }, {
      tableName: 'usuarios_contas',
      underscored: true,
      underscoredAll: true,
      timestamps: true,
      paranoid: true,
  });
  usuarios_contas.associate = function(models) {
    usuarios_contas.belongsTo(models.usuarios, {foreignKey: 'id_usuario'});
  };
  //usuarios_contas.sync();
  return usuarios_contas;
};