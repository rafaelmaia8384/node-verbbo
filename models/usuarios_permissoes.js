'use strict';

module.exports = (sequelize, DataTypes) => {
  const usuarios_permissoes = sequelize.define('usuarios_permissoes', {
        id: {
            primaryKey: true,
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false
        },
        id_usuario: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        id_permissao: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
  }, {
      tableName: 'usuarios_permissoes',
      timestamps: false,
  });
  usuarios_permissoes.associate = function(models) {
    usuarios_permissoes.belongsTo(models.usuarios, {foreignKey: 'id_usuario'});
  };
  return usuarios_permissoes;
};