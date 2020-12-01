'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const config = require('../config/config.js');
const configVerbbo = require('../config/configVerbbo.js');
const basename = path.basename(__filename);
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});
//Criar tabelas se não existirem
sequelize.sync().then(async () => {
    const admin = await db.usuarios.findOne({
        where: { cpf: '00000000000' },
    });
    if (!admin) {
        const usuario = await db.usuarios.create({
            nome: 'root',
            resumo: 'Usuário root.',
            nome_completo: 'root',
            cpf: '00000000000',
            data_nascimento: '01/01/1970',
            telefone: '00000000000',
            email: 'root@verbbo.com.br',
            senha_hash: '4297f44b13955235245b2497399d7a93', //123123
            path_image: 'null',
        });
        await db.usuarios_analises.create({
            id_usuario: usuario.id,
            id_analisador1: usuario.id,
            id_analisador2: usuario.id,
            path_image: 'null',
            analise_concluida: true,
            analise_aprovada: true,
        });
        const permissoes = configVerbbo.permissoes;
        await db.usuarios_permissoes.destroy({
            where: {
                id_usuario: usuario.id,
            },
            paranoid: false,
        });
        permissoes.map(async(p) => {
            await db.usuarios_permissoes.create({
                id_usuario: usuario.id,
                id_permissao: p.id,
            });
        });
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
